import React from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {connFlr} from '../../store/actions/index';

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#6c747d"
    }
  };

class FConnModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      cost:'',
      type:'',
      modalIsOpen: false,
    }
  }

  componentDidMount(){    
      this.openModal()
    if(this.props.lists.length>0){
      let array =  this.props.lists.filter(r=>{
        return Object.keys(r).length !== 5
      })
      for(let i = 0;i<array.length;i++){
        if((array[i].floorElement === 'floorConn') && (array[i].Node === this.props.Node) ){
            this.setState({
              name: array[i].details.name,
              type: array[i].details.type,
              macId: array[i].details.macId,
            })
        }
      }
    }    
}

  handleInputChange = (e)=>{
    const target = e.target;
    const value =  target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    let details = this.state
    let data = {connectedNode:this.props.connector,name:this.state.name,type:this.state.type,cost:this.state.cost}
    this.props.connFlr(data,()=>{
        console.log("connect floor",this.props.flrConn)
    })
    this.closeModal()
    // this.props.save(this.props.Node);
  }

  cancel = ()=>{
    this.props.closeModal()
  }

  openModal = ()=> {
    this.setState({ modalIsOpen: true });
  }

  closeModal = ()=> {
    this.setState({ modalIsOpen: false });
    this.props.hideModal(false)
  }

  render() {
      console.log("rendered")
    return (

      <div>
    <Modal
        isOpen={this.state.modalIsOpen}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      > 
        <form onSubmit={this.handleSubmit}>
          <div>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" name="name" placeholder="Enter name" value={this.state.name}  onChange={this.handleInputChange} />
          </div>
          <div class="form-group">
            <label for="name">Cost</label>
            <input type="text" class="form-control" id="cost" name="cost" placeholder="Enter MAC ID" value={this.state.cost}  onChange={this.handleInputChange} />
          </div>
          <div class="form-group">
              <label for="inputState">Type</label>
              <select id="inputState" class="form-control" name="type" value={this.state.type}  onChange={this.handleInputChange} >
                <option selected>Choose...</option>
                <option value="Start Point">Stair Linkage</option>
                <option value="List">Ramp Linkage</option>
                <option value="Ramp">Lift Linkage</option>
                <option value="Escalator">Escalator Linkage</option>
                <option value="Escalator">Stairs Linkage</option>
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-dark">Submit</button>
          <button type="button" class="btn btn-dark" onClick = {this.cancel}>Cancel</button>
        </form>
      </Modal>
      </div>
    )
  }
}

const mapStateToProps =(state)=> {
  return {
    details: state.updateJunction,
    element: state.junctionDetails,
    lists: state.elementDetails,
    allNodes:  state.getAllElem,
    flrConn: state.flrConn
  }
}

export default connect(mapStateToProps,{connFlr})(FConnModal);
