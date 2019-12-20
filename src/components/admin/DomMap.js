import React from 'react';
import { connect } from 'react-redux';
import { login, junctionCoordinates, junctionDetails, savePath, imgDetails,elementDetails,clearPoints,getAllElements,delNode,delPath } from '../../store/actions/index';
import ReactTooltip from 'react-tooltip';
import config from '../../config';
import ElementDetails from './ElementDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class DomMap extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imageUrl: '',
            clickable:false,
            // rmSel:false,
            // jnctSel:false,
            // doorSel:false,
            // fConn:false,
            // rrmFalse:false,
            // srvSel:false,
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
            // this.refs[i].style.opacity = "0.2"
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
      let {clickable,createPath,delJnct,delPath,showModal} = this.state
      if(this.props.lists.length >0 && createPath === false && delJnct === false && delPath === false){
        for(let m=0;m<this.props.lists.length;m++){
          if(this.props.lists[m].Node === i){
            this.setState({
              elementName: this.props.lists[m].floorElement ,
              showModal: true,
              nodeValue: i,
             })
          }
        }
       }

        if(clickable === true && createPath === false && delJnct === false && delPath === false){
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
         }else if(clickable === true && createPath === true  && delJnct === false && delPath === false){
           if(this.props.allNodes[0].length>0){
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
              }else if(clickable === true && delJnct === true && showModal === false){
                //   let delNodes = this.props.lists;

                // for(let dl=0;dl<delNodes;dl++){
                //     if(i=== delNodes[dl].Node){
                //       this.props.delNode(delNodes[dl],()=>{
                //           // 
                //           this.rst(delNodes[dl].Node)
                //       })
                //     }
                // }
              }else if(clickable === true && delPath === true){
    
              }else{
    
              }
            }
           }else{
             console.log("here")
            //  if(true){
              //  this.finalData = this.props.lists
               for(let j = 0;j<this.props.lists.length;j++){
                if(i === this.props.lists[j].Node){
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
              // }
    
            }
          }else{
              console.log('')
          
          
            }


            if(delJnct === true){
                let delNodes = this.props.lists;
                console.log("truth",delNodes)
                for(let dl=0;dl<delNodes.length;dl++){
                  console.log("delnodes",i,delNodes[dl].Node)

                    if(i=== delNodes[dl].Node){
                      this.props.delNode(delNodes[dl],()=>{
                          // 
                          console.log("deleted")
                          this.rst(delNodes[dl].Node)

                          this.props.lists.splice(dl,1)
                      })
                    }
                }
            }

            if(delPath === true){
              console.log("delpath",this.props.lists)
                       //  this.finalData = this.props.lists
                       for(let j = 0;j<this.props.lists.length;j++){
                        if(i === this.props.lists[j].Node){
                              if(this.connectedPoints.length !== 2){
                                  this.connectedPoints.push(i);
                              }
                              if(this.connectedPoints.length === 2){
                                if(this.connectedPoints[0]===this.connectedPoints[1]){
                                  this.connectedPoints.pop()
                                }else{
                                  console.log("connected points",this.connectedPoints)
                                  let p1 = this.connectedPoints[0];
                                  let p2 = this.connectedPoints[1];
                                  let bname = localStorage.getItem('buildingName');
                                  let floor = localStorage.getItem('floor');
                                  this.props.delPath(p1,p2,bname,floor,()=>{
                                    this.deletePath(p1,p2)
                                  })
                                }
                              }
                        }else{
                          console.log("not in array")
                        }
                  }
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

  deletePath = (x,y) =>{
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
        this.rst(g);
        this.deletePath(g,x);
        this.deletePath(g,y);
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
      elementName:'Room',
      createPath:false,
      clickable:true,
      delJnct:false
    })
      // this.selected('room');
  }
  jnctSel = ()=>{
    this.setState({
      elementName:'Junction',
      createPath:false,
      clickable:true,
      delJnct:false
    })
      // this.selected('junction');
  }
  doorSel = ()=>{
    this.setState({
      elementName:'Door',
      createPath:false,
      clickable:true,
      delJnct:false
    })
      // this.selected('door');
  }

  fConn = ()=>{
    this.setState({
      // fConn:true,
      elementName:'FloorConnection',
      createPath:false,
      clickable:true,
      delJnct:false
    })
      // this.selected('floorConnect');
  }

  rrmSel = ()=>{
    this.setState({
      // rrmSel:true,
      elementName:'RestRoom',
      createPath:false,
      clickable:true,
      delJnct:false
    })
      // this.selected('restRoom');
  }

  srvSel = ()=>{
    this.setState({
      // srvSel:true,
      elementName:'Services',
      createPath:false,
      clickable:true,
      delJnct:false
    })
      // this.selected('service');
  }

  delPath = ()=>{
    this.setState({
      delPath:true,
      clickable: true,
      delJnct: false
    })
  }

  delJnct = ()=>{
    this.setState({
      delJnct:true,
      clickable: true,
      showModal:false
    })
  }

  clrAll = ()=>{

  }

  goBack = ()=>{
    let name = localStorage.getItem('buildingName')
    this.props.history.push({
      pathname: '/details',
      search: `${name}`,
      })
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
            let flr =  url.split(":")[3];
            this.floor = flr.split("&&")[0];
            console.log("floor",this.floor)
            this.file = url.split(":")[4]
        }
        catch{
            this.buildingName = null
            this.file = null
        }
        if (this.buildingName && this.floor) {
          let username = localStorage.getItem('username');

          localStorage.clear();
          localStorage.setItem('buildingName',this.buildingName);
          localStorage.setItem('floor',this.floor);
          // let username = this.props.users.firstname + this.props.users.lastname;
          this.props.getAllElements(username,()=>{
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
            console.log("cfiles",this.props.fileName,this.props.fileName.cFile)
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

      this.connectedPoints = [];
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
          // if(this.finalData.length === 0){
            this.finalData = this.props.lists
            this.finalData = this.finalData.filter(r=>{
              return Object.keys(r).length !== 5
            })
          // }
          var clean = this.finalData.filter((arr, index, self) =>
          index === self.findIndex((t) => (t.Node === arr.Node && t.details.name === arr.details.name)))
        //  let data =  [...new Set(this.finalData)];
          // console.log("dataa",data)
          this.finalLinks = this.props.links
          // let linkedData = [...new Set(this.finalLinks)]
          // console.log("final data",this.linkedData)
          let completeData = {elements:clean,links:this.finalLinks}
          this.props.savePath(completeData,()=>{
            console.log("logged")
            toast.success('Map has been annotated successfully.')

          })
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
            name: "Floor Connection",
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
            class:"btn btn-success btn-lg",
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
            name: "Delete Node",
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
              <ToastContainer />
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
                    {/* <i class="h3 fa fa-map-marker"></i> */}
                    <i class="fas fa-person-booth lt-clr"></i>
                  </button>
                  <button
                    type="button"
                    id="junctions"
                    data-tip
                    data-for="junctions"
                    className="btn btn-primary btn-lg"
                    onClick={this.jnctSel}
                  >
                    <img src="/assets/images/Junction.svg" alt="svg-icons" />
                    {/* <i class="h2 fas fa-directions lt-clr"></i> */}
                    {/* <i class="h3 fa fa-arrows"></i> */}
                  </button>
                  <button
                    type="button"
                    id="door"
                    data-tip
                    data-for="door"
                    className="btn btn-primary btn-lg "
                    onClick={this.doorSel}
                  >
                    <img src="/assets/images/door.svg" alt="svg-icons" />
                    {/* <i class="h3 fa fa-key"></i> */}
                    {/* <i class="h2 fas fa-archway lt-clr"></i> */}
                  </button>
                  <button
                    type="button"
                    id="fconnect"
                    data-tip
                    data-for="fconnect"
                    className="btn btn-primary btn-lg "
                    onClick={this.fConn}
                  >
                    <img src="/assets/images/Stair.svg" alt="svg-icons" />
                    {/* <i class="h2 fas fa-snowboarding lt-clr"></i> */}
                    {/* <i class="h3 fa fa-link"></i> */}
                  </button>
                  <button
                    type="button"
                    id="rroom"
                    className="btn btn-primary btn-lg"
                    data-tip
                    data-for="rroom"
                    onClick={this.rrmSel}
                  >
                    <i class="fas fa-restroom lt-clr"></i>
                    {/* <i class="h3 fa fa-bath"></i> */}
                  </button>
                  <button
                    type="button"
                    id="services"
                    className="btn btn-primary btn-lg"
                    data-tip
                    data-for="services"
                    onClick={this.srvSel}
                  >
                    <i class="fa fa-user-circle-o lt-clr"></i>
                  </button>
                  <button
                    type="button"
                    id="back"
                    className="btn btn-primary btn-lg mb-5"
                    data-tip
                    data-for="back"
                    onClick={this.goBack}
                  >
                    <i class="fa fa-arrow-left lt-clr"></i>
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
                    <img src="/assets/images/Creation.svg" alt="svg-icons" />
                    {/* <i class="h2 fas fa-bacon lt-clr"></i> */}
                    {/* <i class="h3 fa fa-road"></i> */}
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    id="und"
                    data-tip
                    data-for="und"
                  >
                    <img src="/assets/images/Undo.svg" alt="svg-icons" />

                    {/* <i class="h2 fas fa-undo lt-clr"></i> */}
                    {/* <i class="h2 fa fa-mail-reply"></i> */}
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    id="rdo"
                    data-tip
                    data-for="rdo"
                  >
                    <img src="/assets/images/Redo.svg" alt="svg-icons" />
                    {/* <i class="h2 fas fa-redo lt-clr"></i> */}
                    {/* <i class="h2 fa fa-mail-dark"></i> */}
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    id="del-pth"
                    data-tip
                    data-for="del-pth"
                    onClick={this.delPath}
                  >
                    <img src="/assets/images/Deletion.svg" alt="svg-icons" />
                    {/* <i class="h2 fa fa-ban lt-clr"></i> */}
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    id="del-jnct"
                    data-tip
                    data-for="del-jnct"
                    onClick={this.delJnct}
                  >
                    <i class="fa fa-times lt-clr"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    id="clr-all"
                    data-tip
                    data-for="clr-all"
                    onClick={this.clrAll}
                  >
                    <i class="fa fa-trash lt-clr"></i>
                  </button>
                  <button type="button" id="save" className="btn lt-primary btn-lg" data-tip data-for="save" onClick={this.save}><i class="h2 fa fa-check dr-clr"></i></button>
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

export default connect(mapStateToProps, { login, junctionCoordinates, junctionDetails, savePath, imgDetails, clearPoints,getAllElements,delNode,delPath })(DomMap);