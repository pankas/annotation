import React from 'react';
import config from '../../config';
import { connect } from 'react-redux';
import { floorList,getFconnector } from "../../store/actions/index";
import FConnModal from './FConnModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ConnectFloor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      map1:'',
      map2:'',
      connect:false,
      map1Data:null,
      map2Data:null,
      showModal: false,
      floorConnectorPoint:null,
      connFloor: false,
      select: 0,
    }
    this.dom = [];
    this.dom1 = [];
    this.fConn = [];
    this.map1Point = null;
    this.map2Point = null;
    this.connectedPoints = [];
    this.mapPoints = []
  }
  clk(i){
    let {select} = this.state;
    if(this.state.connFloor){
      if (this.find(i,this.mapPoints) === -1) {
        toast.error('Please select one of the registered points')
     }else{
       if(select === 0){
            this.blue(i);
            this.connectedPoints.push(i)
            this.setState({
               select : 1,
            })
       }
       else{
            this.connectedPoints.push(i)
            this.yellow(i);
            this.finalPath(this.connectedPoints[0],this.connectedPoints[1]);
            this.setState({
            select : 0,
            showModal: true,
          })
          this.connectedPoints = []
       }
     }
    }
  }  
  blue=(i)=> {
    this.refs[i].style.backgroundColor = "blue";
    this.refs[i].style.opacity = "1";
  }
  find = (key,array)=>{
    for (let i = 0; i < array.length; i++) {
        if (array[i] === key) {
          return i;
        }
    }
    return -1;
}

  showMap(fileName,buildingName,floor){
    let uname = localStorage.getItem('username');
    if(this.state.map1.length === 0){
      this.props.getFconnector(uname,buildingName,floor,()=>{
        for(let i=0;i<this.props.nodes[0].nodes.length;i++){
          if(this.props.nodes[0].nodes[i].floorElement === 'FloorConnection'){
            this.fConn.push(this.props.nodes[0].nodes[i])
            let int = parseInt(this.props.nodes[0].nodes[i].node)
            let var1,var2;
            var1 = parseInt(int/100);
            var2 = int%100;
            int = 60*var1 + var2;
            this.red1(int);
            this.map1Point = int
            this.mapPoints.push(int)
          }
        }
        this.setState({
          map1: fileName,
          map1Data: this.props.nodes
        })
      })
      return;
    }else if(this.state.map2.length === 0){
      this.props.getFconnector(uname,buildingName,floor,()=>{
        for(let i=0;i<this.props.nodes[0].nodes.length;i++){
          if(this.props.nodes[0].nodes[i].floorElement === 'FloorConnection'){
            this.fConn.push(this.props.nodes[0].nodes[i])
            let int1 = parseInt(this.props.nodes[0].nodes[i].node)
            let var1,var2;
            var1 = parseInt(int1/100);
            var2 = int1%100;
            int1 = 60*var1 + var2;
            int1+=3600;
            this.red(int1)
            this.map2Point = int1
            this.mapPoints.push(int1);
          }
        }
        this.setState({
          map2: fileName,
          map2Data: this.props.nodes
        },()=>{
          console.log("map2 data",this.state.map2Data)
        })
      })
      // this.setState({
      //   map2: fileName
      // })
      return ;
    }else if(this.state.map1.length !== 0 && this.state.map2.length !== 0){
      
    }
    console.log("floor connect",this.fConn)
  }

  green=(i)=>{
    this.refs[i].style.backgroundColor = "lawngreen";
    this.refs[i].style.opacity = "1";
  }
  orange=(i)=>{
     this.refs[i].style.backgroundColor = "orange";
     this.refs[i].style.opacity = "1";
  }
  red1=(i)=>{
    console.log("ii",i)
    this.refs[i].style.backgroundColor = "black";
    this.refs[i].style.opacity = "1";
    // this.refs[i/2+(i%100)/2].style.backgroundColor = "red";
    // this.refs[i/2+(i%100)/2].style.opacity = "1";
  }
  red=(i)=>{
    this.refs[i].style.backgroundColor = "red";
    this.refs[i].style.opacity = "1";
    // this.refs[i+3600].style.backgroundColor = "red";
    // this.refs[i+3600].style.opacity = "1";
  }
  yellow=(i)=>{
    this.refs[i].style.backgroundColor = "yellow";
    this.refs[i].style.opacity = "1";
  }
  connect = ()=>{
    this.setState({
      connFloor: true
    })
    //    this.finalPath(this.map1Point,this.map2Point);
    //    this.setState({
    //    select : 0,
    //    edgeIndex : -1,
    //    showModal: true,
    //    floorConnectorPoint:[this.map1Point,this.map2Point]
    //  })
  }

  finalPath = (x,y)=>{
    console.log("xx and yyy",x,y)
    this.path(x,y);
    this.red(x);
    this.red(y);
  }
  clear = ()=>{
    this.setState({
      map1:'',
      map2:''
    })
  }

  path = (x,y)=>{
    var a,b,c,d,e,f,g;
      a = Math.floor(x/60);
      b = x%60;
      c = Math.floor(y/60);
      d = y%60;
      e = Math.floor((a+c)/2);
      f = Math.floor((b+d)/2);
      if(e === a & f === b){
          g = 60*c +b;
          this.green(g);
      }else if(e === c & f === d){
          g =60*a+d;
          this.green(g);
      }else {
          g = 60*e +f;
          this.green(g);
          this.path(g,x);
          this.path(g,y);
      }
}

handleCancel  = (bool,i)=>{
  this.setState({
      elementName: '',
  })
  if(bool === true){
       // this.nodedelete(i,this.props.lists)
  }
}

handleModal = (val) => {
  this.setState({
      showModal: val
  })
}

componentWillMount() {
  let url = window.location.href;
  let arr = url.split("?");
  this.setState({ buildingName: arr[1] });
  let name = arr[1];
  let username = this.props.users.username;
  localStorage.setItem("username",username)
  let uname = localStorage.getItem('username')
  this.props.floorList(uname, name,()=>{
    console.log("props list",this.props.lists)
  });
}

  render(){
    this.dom1 = [];
       let grid_val = 0;
       for (let row = 0; row < 120 ; row++) {
        for (let colm = 0; colm < 60; colm++) {
            grid_val = 60 * row + colm;
            this.dom1.push(<div className="grid-item" ref={`${grid_val}`} id ={`${grid_val}`} onClick = {this.clk.bind(this,grid_val)} ></div>)
        }
       }
    return (

      <div className="container-fluid content-wrapper">
                <ToastContainer />

                {this.state.showModal ? <FConnModal hideModal={this.handleModal} cancel={this.handleCancel} connector={this.state.floorConnectorPoint} /> : null}            
        <div className="row">
              <div className="col-sm-1">
                <div
                  class="btn-group-vertical"
                  role="group"
                  aria-label="Button group with floor list"
                >
                  {this.props.lists.map(r => {
                    return (
                      <button type="button" class="btn btn-secondary" onClick={this.showMap.bind(this,r.fileName,r.buildingName,r.floor)}>
                        {r.floor}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="col-sm-9">
                <div className="d-flex-column justify-content-center">
                <div
                   id="example4"
                   style={{
                    background: `url("${config.imgUrl}${this.state.map2}"),url("${config.imgUrl}${this.state.map1}")`,
                    backgroundRepeat: "no-repeat,no-repeat !important",
                    backgroundSize: "50% 50% !important",
                    backgroundPosition: "left top, left bottom !important"
                   }}
                >
                    <div className="grid-container1">
                      {this.dom1.map(r => {
                        return r;
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-1">
              <button type="button" class="btn btn-secondary" onClick={this.connect}>
                        Connect
                      </button>
              </div>
            </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    getImage: state.imgDetails,
    lists: state.floorList,
    users: state.users,
    nodes:state.fConn
  }
}

export default connect(mapStateToProps,{floorList,getFconnector})(ConnectFloor);