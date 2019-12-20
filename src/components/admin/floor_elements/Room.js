import React from 'react';
import {connect} from 'react-redux';
import {junctionDetails,updateJunction,elementDetails} from '../../../store/actions/index';

class Room extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      macId:'',
      type:'',
      edit:false
    }
  }

  componentDidMount(){  
      if(this.props.lists.length>0){
        let array =  this.props.lists.filter(r=>{
          return Object.keys(r).length !== 5
        })
        for(let i = 0;i<array.length;i++){
          if((array[i].floorElement === 'Rooms') && (array[i].Node === this.props.Node) ){
            let name = '';
            let type = '';
            let macId = '';
            if(array[i].details.name === 'undefined'){
              name = ''
            }else{
              name = array[i].details.name;
            }
            if(array[i].details.type === 'undefined'){
              type = ''
            }else{
              type = array[i].details.type
            }
            if(array[i].details.macId === 'undefined'){
              macId = ''            
            }else{
              macId = array[i].details.macId
            }
              this.setState({
                name: name,
                type: type,
                macId: macId,
                edit: true
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
    for(let i=0;i<this.props.lists.length;i++){
      if(this.props.lists[i].Node ===this.props.Node ){
        let details = this.state 
        if(Object.keys(this.props.lists[i]).length !== 5){
          this.props.lists[i].details.name = this.state.name;
          this.props.lists[i].details.type = this.state.type;
          this.props.lists[i].details.macId = this.state.macId;
        }else if(Object.keys(this.props.lists[i]).length === 5){
          this.props.lists[i] = {...this.props.lists[i],details}
        }else{
          console.log("")
        }
      } 
    this.props.close()
    this.props.save(this.props.Node);
    }
  }

  cancel = ()=>{
    if(this.state.edit === true){
      this.props.close()
    }else{
      this.props.closeModal()
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" class="form-control" id="name" name="name" placeholder="Enter room name" value={this.state.name}  onChange={this.handleInputChange} required />
            </div>
            <div class="form-group">
              <label for="name">Beacon MAC Address</label>
              <input type="text" class="form-control" id="macid" name="macId" placeholder="Enter room name" value={this.state.macId}  onChange={this.handleInputChange} />
            </div>
            <div class="form-group">
                <label for="inputState">Type</label>
                <select id="inputState" class="form-control" name="type" value={this.state.type}  onChange={this.handleInputChange}>
                  <option defaultValue=''>Choose...</option>
                  <option value="Faculty" >Faculty Room</option>
                  <option value="Presentation Room" >Presentation Room</option>
                  <option value="Lab" >Lab</option>
                  <option value="Others" >Others</option>
                </select>
              </div>
          </div>
          <button type="submit" class="btn btn-sm btn-dark mr-2">Add</button>
          <button type="button" class="btn btn-sm btn-dark" onClick={this.cancel}>Cancel</button>
        </form>
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

    }
}

export default connect(mapStateToProps,{junctionDetails,updateJunction,elementDetails})(Room);