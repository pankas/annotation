import React from 'react';
import Modal from 'react-modal';
import Room from './floor_elements/Room';
import Door from './floor_elements/Door';
import RestRoom from './floor_elements/RestRoom';
import Services from './floor_elements/Services';
import Fconn from './floor_elements/Fconn';
import Junction from './floor_elements/Junction';
import Link from './floor_elements/Link';
import {connect} from 'react-redux';
import {junctionCoordinates,junctionDetails,modalState,updateJunction,elementDetails,links} from '../../store/actions/index';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#6c747d',
    width:'32%'
  }
};

class ElementDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    selectedEle:'',
    modalIsOpen: false,
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.elements = ['Rooms','Junctions','Doors','FloorConnection','RestRooms','Services'];
  }

  closeModal(){
    this.setState({ modalIsOpen: false });
    if(this.state.selectedEle !== 'Links'){
      let ind = this.find(this.props.nodeVal,this.props.lists);
          if(ind !== -1){
            if(Object.keys(this.props.lists[ind]).length === 5 ){
              this.props.lists.splice(ind,1);
              this.submit()
              this.props.remove(this.props.nodeVal);  
            }else{
              this.submit()
              this.props.save(this.props.nodeVal);  
            }
            }else{
              this.props.cancel(true,this.props.nodeVal);
            }
    }else{
      let x = this.props.connectedPoints[0];
      let y = this.props.connectedPoints[1];
      this.props.closeLinks(x,y)
    }
  }
  find = (key,array)=>{
    for (let i = 0; i < array.length; i++) {
        if (parseInt(array[i].Node) === key) {
          return i;
        }
    }
    return -1;
}
  submit =()=> {
    this.setState({ modalIsOpen: false })
    this.props.hideModal(false)
  }

  cl = ()=>{
    this.props.clear();
  }

  componentDidMount() {
    let buildingName = localStorage.getItem('buildingName');
    let floor = localStorage.getItem('floor');
    this.openModal();
    if(this.props.elementName === 'Links'){
        this.props.links({floorElement:this.props.elementName,buildingName:buildingName,floor:floor,links:this.props.connectedPoints})
            this.setState({
                selectedEle:this.props.elementName
            })
    }else{
      for(let i=0;i<this.elements.length;i++){
         if(this.props.elementName === this.elements[i]){
            if(this.find(this.props.nodeVal,this.props.lists) === -1){
              this.props.elementDetails({floorElement:this.props.elementName,buildingName:buildingName,floor:floor,coordinates:[this.props.x,this.props.y],Node:this.props.nodeVal})
            } 
              this.setState({
                  selectedEle:this.props.elementName
              })
          }
      }
    }
  }

  find = (key,array)=>{
    for (let i = 0; i < array.length; i++) {
        if (array[i].Node === key) {
          return i;
        }
    }
    return -1;
}

  openModal() {
    this.setState({ modalIsOpen: this.props.showModal })
  }

  selectNode = (event) => {
    this.setState({
      node: event.target.value
    })
  }

  componentWillUnmount(){
    let val = false
    this.props.hideModal(val)
  }

  handleSelect = (e)=>{
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          // onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
           {(()=>{
               let {selectedEle} = this.state;
               if(selectedEle === 'Rooms'){
                    return <Room closeModal={this.closeModal} Node={this.props.nodeVal}  save={this.props.save} close={this.submit} />
               }else if(selectedEle === 'Junctions'){
                    return <Junction closeModal={this.closeModal} Node={this.props.nodeVal} save={this.props.save} close={this.submit} />
               }else if(selectedEle === 'Doors'){
                    return <Door closeModal={this.closeModal} Node={this.props.nodeVal} save={this.props.save} close={this.submit}/>
               }else if(selectedEle === 'FloorConnection'){
                    return <Fconn closeModal={this.closeModal} Node={this.props.nodeVal} save={this.props.save} close={this.submit} />
               }else if(selectedEle === 'RestRooms'){
                    return <RestRoom closeModal={this.closeModal} Node={this.props.nodeVal} save={this.props.save} close={this.submit} />
               }else if(selectedEle === 'Services'){
                    return <Services closeModal={this.closeModal} Node={this.props.nodeVal} save={this.props.save} close={this.submit} />
               }else if(selectedEle === 'Links'){
                    return <Link closeModal={this.closeModal} linkPoints={this.props.connectedPoints} cp={this.cl} save={this.props.save} close={this.submit} />
              }else{
                   console.log('')
               }
           })()} 
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      buildingDetails: state.adminMaps,
      jnctDetails: state.updateJunction,
      coordinates: state.coordinates,
      showModal: state.modal,
      imgDetails: state.imgDetails,
      links: state.links,
      lists: state.elementDetails,

  }
}

export default connect(mapStateToProps, { junctionCoordinates,junctionDetails,modalState,updateJunction,elementDetails,links })(ElementDetails);