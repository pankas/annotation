import React from 'react';
import { connect } from 'react-redux';
import { login, junctionCoordinates, junctionDetails, savePath, getDetails, imgDetails,elementDetails,clearPoints,getAllElements } from '../../store/actions/index';
import ReactTooltip from 'react-tooltip';
import config from '../../config';
import ElementDetails from './ElementDetails';

class Maps extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imageUrl: '',
            clickable:false,
            showModal: false,
            elementName:'',
            nodeValue:0,
            selectedX:0,
            selectedY:0,
            createPath:false,
            cancel: false,
            delPath:false,
            delJnct:false,
            clrAll: false
        }

        this.dom = [[]];
        this.buildingName = null;
        this.floor = null;
        this.file = null;
        this.nodeSelect = false;
        this.cords = [];
        this.chords = [];
        this.connectedNodes = [];
        this.connectedPoints = [];
        this.nameString = [];
        this.clickedNode = [];
        this.finalData = [];
        this.finalLinks = [];
        this.clk = this.clk.bind(this);
    }

  /* Mouse Events */
    mouseOver(i){
            this.greygrid();
            this.refs[i].style.opacity = "0.2"
    }

    mouseOut = (k)=>{
            for(let i=0;i<this.clickedNode.length;i++){
              if(k === this.clickedNode[k]){
                console.log("")
              }else{
              this.greygrid();
              }
            }
    }

    clk(i){
      let {clickable,createPath,delJnct,delPath} = this.state
     if(clickable === true && createPath === false ){
      this.red(i);
      this.clickedNode.push(i);
      let x = this.mod(i);
      let y = this.div(i);
       this.setState({
         showModal: true,
         nodeValue: i,
         selectedX: x, 
         selectedY: y,
       })
       if(this.props.allNodes.length >0){
        for(let m=0;m<this.props.allNodes[0].nodes.length;m++){
          if(this.props.allNodes[0].nodes[m].node === i){
            this.setState({
              elementName: this.props.allNodes[0].nodes[m].element 
             },()=>{
               console.log("props element",this.state.elementName)
             })
          }
        }
       }
     }else if(clickable === true && createPath === true ){
       if(this.props.allNodes.length>0){
        for(let l=0;l<this.props.allNodes.length;l++){
          if(i === this.props.allNodes[l].node){
            if(this.connectedPoints.length <= 2){
              this.connectedPoints.push(i);
          }
          if(this.connectedPoints.length === 2){
              this.setState({
                showModal: true,
                elementName:'links'
              })
              let p1 = this.connectedPoints[0];
              let p2 = this.connectedPoints[1];
              this.finalPath(p1,p2)
              if(this.props.clear){
                this.connectedPoints = []
              }
          }
          }else if(clickable === true && delJnct === true ){
            for(let  i=0;i<this.props.lists.length;i++){
              if(i%2===0){
                this.finalData.push(this.props.lists[i])
              }
            }

            for(let dl=0;dl<this.finalData.length;dl++){
                if(i=== this.finalData[dl].node){
                  this.props.delNode(this.finalData[i],()=>{

                  })
                }
            }
          }else if(clickable === true && delPath === true){

          }else{

          }
        }
       }else{
         if(this.finalData.length === 0){
          for(let  i=0;i<this.props.lists.length;i++){
            if(i%2===0){
              this.finalData.push(this.props.lists[i])
            }
          }
         }
            for(let j = 0;j<this.finalData.length;j++){
                  if(i === this.finalData[j].Node){
                        if(this.connectedPoints.length !== 2){
                            this.connectedPoints.push(i);
                        }
                        if(this.connectedPoints.length === 2){
                          if(this.connectedPoints[0]===this.connectedPoints[1]){
                            this.connectedPoints.pop()
                          }else{
                            this.setState({
                              showModal: true,
                              elementName:'links'
                            })
                            let p1 = this.connectedPoints[0];
                            let p2 = this.connectedPoints[1];
                            this.finalPath(p1,p2)
                          }
                        }
                  }else{
                    console.log("not in array")
                  }
            }
        }
      }else{
          console.log('')
      }
     }

    /* Color Function */
    green = (i)=>{
      this.refs[i].style.backgroundColor = 'lawngreen';
      this.refs[i].style.opacity = '1';
    }

    red = (i)=>{
      this.refs[i].style.backgroundColor = 'red';
      this.refs[i].style.opacity = '1';
    }

    greygrid = ()=>{
        let kk = 0;
        for(let i=0;i<60;i++){
            for(let j=0;j<60;j++){
                kk = 100*i + j;
                this.refs[kk].style.border = '0.16px solid #C0C0C0';
            }
        }
    }

    /*Path Function */
    finalPath = (x,y)=>{
      this.path(x,y);
      this.red(x);
      this.red(y);
      this.check()
  }

  path = (x,y)=>{
    var a,b,c,d,e,f,g;
      a = Math.floor(x/100);
      b = x%100;
      c = Math.floor(y/100);
      d = y%100;
      e = Math.floor((a+c)/2);
      f = Math.floor((b+d)/2);
      if(e === a & f === b){
          g = 100*c +b;
          this.green(g);
      }else if(e === c & f === d){
          g =100*a+d;
          this.green(g);
      }else {
          g = 100*e +f;
          this.green(g);
          this.path(g,x);
          this.path(g,y);
      }
  }

  rst = (i) =>{
    this.refs[i].style.backgroundColor = '';
  }

  reset = ()=>{
    let kk = 0;
    for(let i=0;i<60;i++){
        for(let j=0;j<60;j++){
            kk = 100*i + j;
            this.refs[kk].style.backgroundColor = '';
        }
    }
  }

  display = ()=>{
      let {cords,connectedNodes} = this;
      this.reset();
      for(let o = 0;o < cords.length;o++){
          if(cords[o] !== 0){
              this.red(cords[o]);
              for(let t = 0;t<connectedNodes[o].length;t++){
                  this.finalPath(cords[o],connectedNodes[o][t])
              }
          }
      }
  }

  check = ()=>{
      let {cords,nameString} = this;
      let count = 0;
      for(let b=0;cords.length;b++){
          if(!nameString[b]){
              var t = cords[b];
              count ++;
          }
      }
      if(count>0)
      return false;
  }

    div = (a)=>{
      return Math.floor(a/100)
   }

   mod = (a)=>{
    return (a%100);
   }

   handleSel  = (bool,i)=>{
     this.setState({
       elementName: '',
       createPath: false,
       clickable: false,
     })
     if(bool === true){
      this.rst(i)
     }
   }

   handleSave  = (i)=>{
     this.red(i)
  }

   /* Button Function */
   rmSel = ()=>{
    this.setState({
      elementName:'room',
      createPath:false,
      clickable:true
    })
      // this.selected('room');
  }
  jnctSel = ()=>{
    this.setState({
      elementName:'junction',
      clickable:true,
      createPath: false
    })
      // this.selected('junction');
  }
  doorSel = ()=>{
    this.setState({
      elementName:'door',
      clickable:true,
      createPath: false
    })
      // this.selected('door');
  }

  fConn = ()=>{
    this.setState({
      // fConn:true,
      elementName:'floorConnect',
      clickable:true,
      createPath: false
    })
      // this.selected('floorConnect');
  }

  rrmSel = ()=>{
    this.setState({
      // rrmSel:true,
      elementName:'restRoom',
      clickable:true,
      createPath: false
    })
      // this.selected('restRoom');
  }

  srvSel = ()=>{
    this.setState({
      // srvSel:true,
      elementName:'services',
      clickable:true,
      createPath: false
    })
      // this.selected('service');
  }

  delPath = ()=>{
    this.setState({
      delPath:true,
      clickable: true
    })
  }

  delJnct = ()=>{
    this.setState({
      delJnct:true,
      clickable: true
    })
  }

  clrAll = ()=>{

  }

  goBack = ()=>{
      this.props.history.push('/details')
  }
    
    componentDidMount(){
      this.setState({
        clickable: false
      })
        const img = new Image();
        // img.src =  `${config.editImg}${this.props.uploadImg.file}`;
        const url = window.location.href;
        this.buildingName = null
        this.floor = null
        this.file = null
        try {
            let name = url.split("=")[1];
            this.buildingName = name.split('&&')[0]
            this.floor = url.split(":")[3];
            this.file = url.split(":")[4]
        }
        catch{
            this.buildingName = null
            this.file = null
        }
        if (this.buildingName && this.floor) {
          localStorage.clear();
          localStorage.setItem('buildingName',this.buildingName);
          localStorage.setItem('floor',this.floor);
          let username = this.props.users.firstname + this.props.users.lastname;
          this.props.getAllElements(username,this.buildingName,this.floor,()=>{
            this.setState({
              clickable: true
            })

            if(this.props.allNodes.length>0){
             this.setState({
              createPath: false,
              clickable: true,
             })
            }
            for(let i = 0;i<this.props.allNodes[0].nodes.length;i++){
              let node = this.props.allNodes[0].nodes[i].node;
              this.red(node);
            }
            for(let i = 0;i<this.props.allNodes[0].links.length;i++){
              let node = this.props.allNodes[0].links[i].connectedNode.split(',');
              this.finalPath(parseInt(node[0]),parseInt(node[1]))
            }
          });
          if((this.file !== null) && (this.file !== undefined) ){
            this.props.imgDetails(this.buildingName, this.floor,this.file)
          }else{
            this.props.imgDetails(this.buildingName, this.floor,this.props.fileName.cFile)
          }          
        } else {
                img.src = `${config.editImg}${this.props.uploadImg.file}`
        }
        img.onload = () => {
          this.setState({ imageIsReady: true });
        }
        //   this.setState({ 
        //       imageUrl: `${config.editImg}${this.props.uploadImg.file}`
        //     });
        // this.img = this.refs.image
    }


    handleModal = (val) => {
      this.setState({
          showModal: val
      })
  }

  createPath = ()=>{
      this.setState({
        clickable:true,
        createPath:true,
        elementName:'links'
      })
  }

    componentWillMount(){
        let {cords,chords} = this;
        this.setState({
          showModal: false,
          clickable:false
        })
          for(let i=0;i<this.cords.length;i++){
              cords[i] = chords[i]
          }
        }

        save = (e) => {
          for(let  i=0;i<this.props.lists.length;i++){
            if(i%2===0){
              this.finalData.push(this.props.lists[i])
            }
          }

         let data =  [...new Set(this.finalData)];
          for(let  i=0;i<this.props.links.length;i++){
            if(i%2===0){
              this.finalLinks.push(this.props.links[i])
            }
          }
          
         let linkedData = [...new Set(this.finalLinks)]
          let completeData = {elements:data,links:linkedData}
          // lists: state.elementDetails
          // let data = this.props.elementsList.filter(res => {
          //     return ((Array.isArray(res) === false) && Object.keys(res).length !== 0 && this.props.buildingDetails.building_name === res.buildingName)
          // })
          // let name = localStorage.getItem('buildingName')
          this.props.savePath(completeData)
          // this.props.history.push({
          //   pathname: '/details',
          //   search: `${name}`,
          // })
      }

      clearConnect = ()=>{
        this.connectedPoints = [];
      }


    render(){

        const routing = [{
            id: "room",
            name: "Room",
            className: " h3 fa fa-pencil",
            class: "btn btn-primary btn-lg",
            click: this.createJunctions,
            dataFor: "room",
        },
        {
            id: "junctions",
            name: "Junction Point",
            className: "h3 fa fa-road",
            class: "btn btn-secondary btn-lg",
            click: this.createPath,
            dataFor: "junctions"
        },
        {
            id: "create-path",
            name: "CreatePath",
            className: "h3 fa fa-road",
            class: "btn btn-secondary btn-lg",
            click: this.createPath,
            dataFor: "create-path"
        },
        {
            id: "door",
            name: "Gateway",
            className: "h3 fa fa-ban",
            class: "btn btn-danger btn-lg",
            click: this.deleteJunction,
            dataFor: "door"
        },
        {
            id: "fconnect",
            name: "floorconnection point",
            className: "h3 fa fa-times",
            class: "btn btn-danger btn-lg",
            click: this.deletePath,
            dataFor: "fconnect"
        }, 
        {
            id: "rroom",
            name: "Rest room",
            className: "h3 fa fa-trash",
            class: "btn btn-danger btn-lg",
            click: this.deleteAll,
            dataFor: "rroom"
        },
        {
            id: "services",
            name: "Services",
            className: "h3 fa fa-check",
            class: "btn btn-secondary btn-lg",
            click: this.savePath,
            dataFor: "services"
        },
        {
            id: "back",
            name: "Go Back",
            className: "h3 fa fa-arrow-left",
            class:"btn btn-secondary btn-lg",
            dataFor: "back"
            }
        ]

        const hrzntl = [      
             {
            id: "crt-pth",
            name: "Create Path",
            className: "h3 fa fa-arrow-left",
            class:"btn btn-secondary btn-lg",
            dataFor: "crt-pth"
            },
            {
              id: "save",
              name: "Save",
              className: "h3 fa fa-check",
              class: "btn btn-secondary btn-lg",
              click: this.savePath,
              dataFor: "save"
          },
            {
            id: "und",
            name: "Undo",
            className: "h3 fa fa-arrow-left",
            class:"btn btn-secondary btn-lg",
            dataFor: "und"
            },
            {
            id: "rdo",
            name: "Redo",
            className: "h3 fa fa-arrow-left",
            class:"btn btn-secondary btn-lg",
            dataFor: "rdo"
            },
            {
            id: "del-pth",
            name: "Delete Path",
            className: "h3 fa fa-arrow-left",
            class:"btn btn-secondary btn-lg",
            dataFor: "del-pth"
            },
            {
            id: "del-jnct",
            name: "Delete Junction",
            className: "h3 fa fa-arrow-left",
            class:"btn btn-secondary btn-lg",
            dataFor: "del-jnct"
            },
            {
            id: "clr-all",
            name: "Clear All",
            className: "h3 fa fa-arrow-left",
            class:"btn btn-secondary btn-lg",
            dataFor: "clr-all"
            }]

            const { imageIsReady } = this.state;
            let k = 0;
            this.dom = [];
            for (let i = 0; i < 60; i++) {
                for (var j = 0; j < 60; j++) {
                     k = 100 * i + j;
                    this.dom.push(<div className="grid-item" ref={`${k}`} id ={`${k}`} onClick = {this.clk.bind(this,k)} onMouseOver = {this.mouseOver.bind(this,k)} onMouseOut ={ this.mouseOut.bind(this,k)} ></div>)
                    // this.dom.push (<div class="grid-item" id ={k></div>);
                }
               }
            for(let temp=0;temp<3600;temp++){
                this.connectedNodes[temp] = [];
            }
        return (
          <div className="container-fluid content-wrapper">
            <div className="row">
              <div className="col-sm-1">
                <div
                  className="btn-group-vertical"
                  role="group"
                  aria-label="First group"
                >
                  <button
                    type="button"
                    id="room"
                    data-tip
                    data-for="room"
                    className="btn btn-primary btn-lg"
                    onClick={this.rmSel}
                  >
                    <i class="h3 fa fa-map-marker"></i>
                  </button>
                  <button
                    type="button"
                    id="junctions"
                    data-tip
                    data-for="junctions"
                    className="btn btn-primary btn-lg"
                    onClick={this.jnctSel}
                  >
                    <i class="h3 fa fa-arrows"></i>
                  </button>
                  <button
                    type="button"
                    id="door"
                    data-tip
                    data-for="door"
                    className="btn btn-primary btn-lg "
                    onClick={this.doorSel}
                  >
                    <i class="h3 fa fa-key"></i>
                  </button>
                  <button
                    type="button"
                    id="fconnect"
                    data-tip
                    data-for="fconnect"
                    className="btn btn-primary btn-lg "
                    onClick={this.fConn}
                  >
                    <i class="h3 fa fa-link"></i>
                  </button>
                  <button
                    type="button"
                    id="rroom"
                    className="btn btn-primary btn-lg"
                    data-tip
                    data-for="rroom"
                    onClick={this.rrmSel}
                  >
                    <i class="h3 fa fa-bath"></i>
                  </button>
                  <button
                    type="button"
                    id="services"
                    className="btn btn-primary btn-lg"
                    data-tip
                    data-for="services"
                    onClick={this.srvSel}
                  >
                    <i class="h3 fa fa-user-circle-o"></i>
                  </button>
                  <button
                    type="button"
                    id="back"
                    className="btn btn-secondary btn-lg mb-5"
                    data-tip
                    data-for="back"
                    onClick={this.goBack}
                  >
                    <i class="h3 fa fa-arrow-left"></i>
                  </button>
                </div>
                {routing.map((item, index) => {
                  return (
                    <div>
                      <ReactTooltip
                        place="right"
                        type="dark"
                        id={item.id}
                        effect="solid"
                      >
                        {" "}
                        {item.name}{" "}
                      </ReactTooltip>
                    </div>
                  );
                })}
                {hrzntl.map((item, index) => {
                  return (
                    <div>
                      <ReactTooltip
                        place="left"
                        type="dark"
                        id={item.id}
                        effect="solid"
                      >
                        {" "}
                        {item.name}{" "}
                      </ReactTooltip>
                    </div>
                  );
                })}
              </div>
              <div className="col-sm-9">
                <div className="d-flex justify-content-center">
                  <div
                    id="example2"
                    style={{
                      background: `url(${config.imgUrl}${this.props.getImage[1]}) 0% 0% / 100% 100% no-repeat`
                    }}
                  >
                    <div className="grid-container">
                      {this.dom.map(r => {
                        return r;
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-1">
                <div
                  class="btn-group-vertical"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    class="btn btn-primary"
                    id="crt-pth"
                    data-tip
                    data-for="crt-pth"
                    onClick={this.createPath}
                  >
                    <i class="h3 fa fa-road"></i>
                  </button>
                  <button type="button" id="save" className="btn btn-success btn-lg" data-tip data-for="save" onClick={this.save}><i class="h3 fa fa-check"></i></button>

                  <button
                    type="button"
                    class="btn btn-primary"
                    id="und"
                    data-tip
                    data-for="und"
                  >
                    <i class="h3 fa fa-mail-reply"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    id="rdo"
                    data-tip
                    data-for="rdo"
                  >
                    <i class="h3 fa fa-mail-forward"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    id="del-pth"
                    data-tip
                    data-for="del-pth"
                    onClick={this.delPath}
                  >
                    <i class="h3 fa fa-ban"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    id="del-jnct"
                    data-tip
                    data-for="del-jnct"
                    onClick={this.delJnct}
                  >
                    <i class="h3 fa fa-times"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    id="clr-all"
                    data-tip
                    data-for="clr-all"
                    onClick={this.clrAll}
                  >
                    <i class="h3 fa fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
            {this.state.showModal ? <ElementDetails x={this.state.selectedX} y={this.state.selectedY} hideModal={this.handleModal} elementName={this.state.elementName} nodeVal={this.state.nodeValue} connectedPoints={this.connectedPoints} cancel={this.handleSel} save={this.handleSave}  clear={this.clearConnect} /> : null}
          </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
        login: state.login,
        buildingDetails: state.adminMaps,
        elementsList: state.updateJunction,
        uploadImg: state.uploadImg,
        getPoints: state.mapDetails,
        getImage: state.imgDetails,
        lists: state.elementDetails,
        links: state.links,
        clear: state.clearPoints ,
        users: state.users,
        allNodes:  state.getAllElem,
        fileName: state.adminMaps
    }
}

export default connect(mapStateToProps, { login, junctionCoordinates, junctionDetails, savePath, getDetails, imgDetails, clearPoints,getAllElements })(Maps);