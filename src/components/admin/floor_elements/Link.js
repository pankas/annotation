import React from 'react';
import {connect} from 'react-redux';
import {junctionDetails,updateJunction,elementDetails,links,clearPoints} from '../../../store/actions/index';

class Link extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      length:'',
      cost:'',
      states:'',
      type:''
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
    for(let i=0;i<this.props.link.length;i++){
      if( JSON.stringify(this.props.link[i].links)  ===  JSON.stringify(this.props.linkPoints) ){
        let details = this.state
        this.props.link[i] = {...this.props.link[i],details}
      }
    }
    this.props.close()
    for(let i=0;i<this.props.length;i++){
      this.props.save(this.props.linkPoints[i]);
    }
  }

  cancel = ()=>{
    this.props.closeModal()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" class="form-control" id="name" name="name" placeholder="Enter name" value={this.state.name}  onChange={this.handleInputChange} required />
            </div>
            <div class="form-group">
              <label for="name">Length</label>
              <input type="text" class="form-control" id="macid" name="length" placeholder="Enter length" value={this.state.macId}  onChange={this.handleInputChange} />
            </div>
            <div class="form-group">
              <label for="name">Cost</label>
              <input type="text" class="form-control" id="macid" name="cost" placeholder="Enter cost" value={this.state.macId}  onChange={this.handleInputChange} />
            </div>
            <div class="form-group">
                <label for="inputState">State</label>
                <select id="inputState" class="form-control" name="states" value={this.state.states}  onChange={this.handleInputChange}>
                  <option selected>Choose...</option>
                  <option value="Faculty" >Working</option>
                  <option value="Presentation Room" >Not Working</option>
                </select>
              </div>
              <div class="form-group">
                <label for="inputState">Type</label>
                <select id="inputState" class="form-control" name="type" value={this.state.type}  onChange={this.handleInputChange}>
                  <option selected>Choose...</option>
                </select>
              </div>
          </div>
          <button type="submit" class="btn btn-sm btn-primary mr-2">Submit</button>
          <button type="button" class="btn btn-sm btn-primary" onClick={this.cancel}>Cancel</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps =(state)=> {
  console.log("update junctions",state.junctionDetails)
    return {
      details: state.updateJunction,
      element: state.junctionDetails,
      lists: state.elementDetails,
      link: state.links,
      clear: state.clearPoints 
    }
}

export default connect(mapStateToProps,{junctionDetails,updateJunction,elementDetails,links,clearPoints})(Link);