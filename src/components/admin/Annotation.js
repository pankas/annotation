import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ElementDetails from './ElementDetails';
import ReactTooltip from 'react-tooltip';
import { login, junctionCoordinates, junctionDetails, savePath, imgDetails,elementDetails,clearPoints,getAllElements,delNode,delPath } from '../../store/actions/index';
import { connect } from 'react-redux';
import config from '../../config';
import { MapInteractionCSS } from 'react-map-interaction';

class Annotation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nodeSelect : false,
            edgeSelect: false,
            deleteNode: false,
            deletedNode: false,
            showModal: false,
            clrAll: false,
            select: 0,
            tag: false,
            tagSelect: 0,
            tagIndex: -1,
            edgeIndex:-1,
            str:'',
            str1:'',
            str2:'',
            sel:0,
            prev:-1,
            sele:-1,
            selectedElement:'',
            selectedX:0,
            selectedY:0,
            buildingName:'',
            floor:'',
            name:'',
            type:'',
            connectedPoints:[],
        }
        this.nodeSelect = this.nodeSelect.bind(this)
        this.cords = [];
        this.connectedNodes = [];
        this.finalData = [];
        this.nodeExtr = [];
        this.linkExtr = [];
        this.connectedPoints = [];
        // this.connectedPoints = [];
        this.elements = ['Rooms','Doors','Junctions','FloorConnection','Services','RestRooms']
    }
    componentDidMount(){
      for (let temp = 0; temp < 3600 ; temp++) {
        this.connectedNodes[temp] = [];
      }
        this.setState({
          clickable: false
        })
          const img = new Image();
          const url = window.location.href;
          this.buildingName = null
          this.floor = null
          this.file = null
          try {
              let name = url.split("=")[1];
              this.buildingName = name.split('&&')[0]
              let flr =  url.split(":")[3];
              this.floor = flr.split("&&")[0];
              this.file = url.split(":")[4]
          }
          catch{
              this.buildingName = null
              this.file = null
          }
          if (this.buildingName && this.floor) {
            let username = localStorage.getItem('username');
            localStorage.clear();
            this.setState({
              buildingName: this.buildingName,
              floor:this.floor
            })
            localStorage.setItem('buildingName',this.buildingName);
            localStorage.setItem('floor',this.floor);
            this.props.getAllElements(username,()=>{
              this.setState({
                clickable: true
              })
    //           { floorElement: 'Rooms',
    // buildingName: 'test',
    // floor: 'first',
    // coordinates: [ 30, 10 ],
    // Node: 1030,
    // details: { name: 'sdjh', macId: '872383', type: 'Presentation Room' } }
    // buildingName: "test"
    // details: {name: "link1", length: "8237938", cost: "2", states: "Faculty", type: ""}
    // floor: "first"
    // floorElement: "Links"
    // links: (2) [2536, 1141]
              if(this.props.allNodes.length>0){
                /* STORING TO LISTS */
              for(let i = 0;i<this.props.allNodes[0].nodes.length;i++){
                let nd = this.props.allNodes[0].nodes[i]
                let node = nd.node;
                let coordinates = nd.coordinates.split(',')
                coordinates = [parseInt(coordinates[0]),parseInt(coordinates[1])]
                this.props.lists.push({floorElement: `${nd.floorElement}`, buildingName: `${nd.buildingName}`,floor: `${nd.floor}`,coordinates: coordinates,Node: parseInt(nd.node),details: { name: `${nd.name}`, macId: `${nd.MACID}`, type: `${nd.type}` } })
                this.red(node);
              }
              /* STORING TO LINKS */
              for(let i=0;i<this.props.allNodes[0].links.length;i++){
                let ln = this.props.allNodes[0].links[i]
                let coords = ln.connectedNode.split(',')
                for(let k =0; k<coords.length;k++){
                  coords[k] = +coords[k]
                }
                  this.props.links.push({floorElement: `${ln.floorElement}`,buildingName:`${this.buildingName}`,floor:`${this.floor}`,links: coords,details: {name: `${ln.name}`, length: `${ln.length}`, cost: `${ln.cost}`, states: `${ln.states}`, type: `${ln.type}`}})
              }
              for(let i = 0;i<this.props.allNodes[0].links.length;i++){
                let node = this.props.allNodes[0].links[i].connectedNode.split(',');
                this.finalPath(parseInt(node[0]),parseInt(node[1]))
              }
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
    }
    clk = (i)=>{
        let {nodeSelect,edgeSelect,deleteNode,select,sel,prev,sele,edgeIndex,clrAll} = this.state;
        let cords = this;
        let indices = this.find(i,this.props.lists);
        if(this.props.lists.length > 0){
          // console.log("props listss",this.props.lists[indices].floorElement)
          if(this.find(i,this.props.lists)!== -1 && deleteNode === false && edgeSelect === false){
            this.setState({ sel : 0,selectedElement:this.props.lists[indices].floorElement,showModal:true,sele:i })
          }
        } 
        if(nodeSelect){                                                         
            let {selectedElement} = this.state        
            if (this.find(i,this.props.lists) === -1){
              this.cords.push(i);   
              this.red(i);
              this.display();
              let x = this.mod(i);
              let y = this.div(i);
            this.setState({
                select : 0,
                sele : i,
                tag : true,
                nodeSelect : false,
                edgeSelect : false,
                deleteNode : false,
                selectedX: x,
                selectedY: y,
                showModal: true
        })}
            else{
            toast.error('You have already selected the node')
            }
          } else if (edgeSelect) {
         if (this.find(i,this.props.lists) === -1) {
            toast.error('Please select one of the registered points')
         }else{
           if(select === 0){
                this.blue(i);
                let index = this.find(i,this.props.lists);
                this.connectedPoints.push(this.props.lists[index].Node)
                this.setState({
                   edgeIndex : index,
                   select : 1,
                  connectedPoints:[]
                })
           }
           else{
                let connectedNodes = this;
                let cords = this;
                let {edgeIndex} = this.state;
                this.yellow(i);
                this.finalPath(i,this.props.lists[edgeIndex].Node);
                this.connectedPoints.push(i)
                this.setState({
                select : 0,
                edgeIndex : -1,
                showModal: true,
                connectedPoints:[i,this.props.lists[edgeIndex].Node]
              })
           }
         }
       } else if (deleteNode) {
            let indexDelete = this.find(i,this.props.lists);
            if (indexDelete === -1) {
            toast.error('Please select registered point')
            } else {
              if(this.props.links.length>0){
                this.pathdelete(i,this.props.links);
              }
              if(this.props.lists.length>0){
                this.nodedelete(i,this.props.lists);
              }
              this.greygrid();
              this.reset();
              this.display();
              this.setState({
                nodeSelect: false,
                edgeSelect: false,
                deleteNode: false,
                deletedNode: true,
                clrAll:false,
              })
            }
          }
    }
    /* LOGIC */
    nodedelete=(q,w)=>{
        var ind = this.find(q,w);
        this.nodeExtr.push(this.props.lists[ind]);  
        if(q!==-1){
        w.splice(ind,1);
     }
    }
    showTooltip = ()=>{
      this.setState({
        tooltipOpen: !this.state.tooltipOpen
      });
      // setTimeout(() => {
        // this.onShow();
      // }, 54000);
    }
    pathdelete=(q,w)=>{
        var ind = this.findInPath(q,w);
         this.linkExtr.push(ind);
        if(q!==-1){
        w.splice(ind,1);
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
    findInPath = (key,array)=>{
      for (let i = 0; i < array.length; i++) {
        for(let k =0;k<array[i].links.length;k++){
          if(array[i].links[k] === key){
            return i
          }
        }
      }
      return -1;
  }
    div = (a)=>{
        return Math.floor(a/100)
    }
    mod = (a)=>{
      return (a%100);
    }
    handleModal = (val) => {
        this.setState({
            showModal: val
        })
    }
    handleCancel  = (bool,i)=>{
       this.setState({
            elementName: '',
            createPath: false,
            clickable: false,
       })
       if(bool === true){
            this.nodedelete(i,this.props.lists)
            this.refs[i].style.backgroundColor = "";
       }
    }
    handleSave  = (i) => {
      // console.log("iith node",i)
        this.red(i)
    }
    remove = (i)=>{
      this.disappear(i)
    }
    finalPath = (x,y)=>{
      this.path(x,y);
      this.red(x);
      this.red(y);
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
    deletepath =(x,y)=>{
      let a,b,c,d,e,f,g;
      a = Math.floor(x/100); b = x%100;
      c = Math.floor(y/100); d = y%100;
      e = Math.floor((a+c)/2);
      f = Math.floor((b+d)/2);
      if (e===a & f===b) {
        g = 100*c +b ;
        this.disappear(g);
      }
      else if (e===c & f===d) {
        g = 100*a +d ;
        this.disappear(g);
      } else {
        g = 100*e + f;
        this.disappear(g);
        this.deletepath(g,x);
        this.deletepath(g,y);
      }
  }
  finaldelete =(x,y)=>{
    this.deletepath(x,y);
    this.red(x);
    this.red(y);
    this.props.links.pop();
  }
    /* GRID  COLORING */
    greygrid=()=>{
        let kk = 0;
         for (let ii = 0; ii < 60; ii++) {
           for (let jj = 0; jj < 60; jj++) {
             kk = 100*ii + jj;
             this.refs[kk].style.border = ".016px solid #C0C0C0";
           }
        }
    }
    resetgrid=()=>{
      let kk = 0;
       for (let ii = 0; ii < 60; ii++) {
         for (let jj = 0; jj < 60; jj++) {
           kk = 100*ii + jj;
           this.refs[kk].style.border = "none";
         }
      }
  }
    display=()=>{
        for(let i=0;i<this.props.lists.length;i++){
          let node = this.props.lists[i].Node;
          this.red(node)
        }
        if(this.props.links.length>0){
          for(let i = 0;i<this.props.links.length;i++){
            let connectedPoints = this.props.links[i].links
            this.finalPath(connectedPoints[0],connectedPoints[1])  
          }
        }
    }
    green=(i)=>{
      this.refs[i].style.backgroundColor = "lawngreen";
      this.refs[i].style.opacity = "1";
    }
    orange=(i)=>{
       this.refs[i].style.backgroundColor = "orange";
       this.refs[i].style.opacity = "1";
    }
    red=(i)=>{
      this.refs[i].style.backgroundColor = "red";
      this.refs[i].style.opacity = "1";
    }
    yellow=(i)=>{
      this.refs[i].style.backgroundColor = "yellow";
      this.refs[i].style.opacity = "1";
    }
    blue=(i)=> {
      this.refs[i].style.backgroundColor = "blue";
      this.refs[i].style.opacity = "1";
    }
    reset=()=>{
        let kk = 0;
        for (let ii = 0; ii < 60; ii++) {
          for (let jj = 0; jj < 60; jj++) {
            kk = 100*ii + jj;
            this.refs[kk].style.backgroundColor = "";
          }
        }
    }
    disappear=(x)=>{
      this.refs[x].style.backgroundColor = "";
    }
    /* MOUSE EVENTS */
    mouseOver = (i)=>{
        let {nodeSelect,deleteNode,clrAll} = this.state
        if(nodeSelect || deleteNode || clrAll){
            this.greygrid();
            this.display();
            this.red(i);
            this.refs[i].style.opacity = "0.5"
        }
        for(let i=0;i<this.props.lists.length;i++){
          if(this.props.lists[i].Node === i){
              this.setState({
                name:this.props.lists[i].details.name,
                type:this.props.lists[i].details.type
              })
          }
        }
        // if(deleteNode){
        //   this.greygrid();
        //   this.display();
        //   this.red(i);
        //   this.refs[i].style.opacity = "0.5"
        // }
        // if(clrAll){
        //   this.greygrid();
        //   this.display();
        //   this.red(i);
        //   this.refs[i].style.opacity = "0.5"
        // }
    }
    mouseOut=(i)=>{
      let {nodeSelect,deleteNode,clrAll} = this.state
      if(nodeSelect ||  deleteNode || clrAll){
        this.greygrid();
        this.reset();
        this.display();
      }
    }
    /* */ 
    /* HANDLING BUTTON EVENT */
    nodeSelect(elem){
      this.setState({
          nodeSelect: true,
          edgeSelect: false,
          deleteNode: false,
          clrAll:false,
          selectedElement: elem,
          select : 0
      })
    }
    edgeSelect(elem){
        this.setState({
            nodeSelect: false,
            edgeSelect: true,
            deleteNode: false,
            clrAll: false,
            selectedElement: elem,
            select : 0
        })    
    }
    undo = ()=>{
      this.setState({
        nodeSelect: false,
        edgeSelect: false,
        deleteNode: false,
        clrAll: false,
        undo: true,
        redo: false
    })
    if(this.props.lists.length>0){
      let nd = this.props.lists.pop();
      this.nodeExtr.push(nd);  
    }
    if(this.props.links.length>0){
      let lnk = this.props.links.pop();
      this.linkExtr.push(lnk);
    }
    this.greygrid();
    this.reset();
    this.display();
    }
    redo = ()=>{
      this.setState({
        nodeSelect: false,
        edgeSelect: false,
        deleteNode: false,
        clrAll: false,
        undo: false,
        redo: false
    })
    let rdNd = null;
    let rdLnk = null;
    if(this.nodeExtr.length>0){
       rdNd = this.nodeExtr.pop();
    this.props.lists.push(rdNd)
    }
    if(this.linkExtr.length>0){
      rdLnk = this.linkExtr.pop();
      this.props.links.push(rdLnk)
    }
    this.greygrid();
    this.reset();
    this.display();
    }
    edgeDelete = ()=>{
        this.setState({
            nodeSelect: false,
            edgeSelect: false,
            deleteNode: true,
            clrAll: false
        })
        // this.greygrid();
        // this.reset();
        // this.display();
    }  
    clrAll = ()=>{
      this.setState({
        clrAll: true,
        nodeSelect: false,
        edgeSelect: false,
        deleteNode: false,
      }) 
      if(this.props.links.length > 0){
        for(let i=0;i<this.props.links.length;i++){
          this.linkExtr.push(this.props.links[i])
        }
        this.props.links.splice(0,this.props.links.length);
      }
      if(this.props.lists.length > 0){
        for(let i=0;i<this.props.lists.length;i++){
          this.nodeExtr.push(this.props.lists[i])
        }
        this.props.lists.splice(0,this.props.lists.length) 
      }
       this.greygrid();
       this.reset();
       this.display();
     }
    savePath = (e) => {
      let uniqueData =  this.props.lists.filter((obj, index, self) =>
        index === self.findIndex((t) => (
          t.Node === obj.Node 
        ))
      )
      console.log("unique ")
      let completeData = {elements:uniqueData,links:this.props.links}
      this.setState({
        nodeSelect : false,
        edgeSelect: false,
        deleteNode: false,
        deletedNode: false,
        showModal: false,
        clrAll: false
      })
      this.props.savePath(completeData,()=>{
        toast.success('Map has been annotated successfully.')
      })
      this.resetgrid();
  }
  goBack = ()=>{
    let name = localStorage.getItem('buildingName')
    this.props.history.push({
      pathname: '/details',
      search: `${name}`,
      })
  }
  componentWillUnmount(){
    console.log("props and lists",this.props.lists)
    for(let i =0;i<this.props.lists.length;i++){
      this.props.lists.pop()
    }
    console.log("after delete",this.props.lists)
    // this.props.lists.splice(0,this.props.lists.length) 
    // this.props.links.splice(0,this.props.lists.links) 
  }
    render(){
      /* TOOLTIP */
      const lfTooltip = [{
        id: "room",
        name: "Room",
        className: " h3 fa fa-pencil",
        class: "btn btn-dark btn-lg",
        click: this.createJunctions,
        dataFor: "room",
    },
    {
        id: "junctions",
        name: "Junction Point",
        className: "h3 fa fa-road",
        class: "btn btn-dark btn-lg",
        click: this.createPath,
        dataFor: "junctions"
    },
    {
        id: "create-path",
        name: "CreatePath",
        className: "h3 fa fa-road",
        class: "btn btn-dark btn-lg",
        click: this.createPath,
        dataFor: "create-path"
    },
    {
        id: "door",
        name: "Door",
        className: "h3 fa fa-ban",
        class: "btn btn-danger btn-lg",
        click: this.deleteJunction,
        dataFor: "door"
    },
    {
        id: "fconnect",
        name: "Floor Connector",
        className: "h3 fa fa-times",
        class: "btn btn-danger btn-lg",
        click: this.deletePath,
        dataFor: "fconnect"
    }, 
    {
        id: "rroom",
        name: "Rest Room",
        className: "h3 fa fa-trash",
        class: "btn btn-danger btn-lg",
        click: this.deleteAll,
        dataFor: "rroom"
    },
    {
        id: "services",
        name: "Services",
        className: "h3 fa fa-check",
        class: "btn btn-dark btn-lg",
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

    const rtTooltip = [      
      {
     id: "crt-pth",
     name: "Create Path",
     className: "h3 fa fa-arrow-left",
     class:"btn btn-dark btn-lg",
     dataFor: "crt-pth"
     },
     {
       id: "save",
       name: "Save",
       className: "h3 fa fa-check",
       class: "btn btn-dark btn-lg",
       click: this.savePath,
       dataFor: "save"
   },
     {
     id: "und",
     name: "Undo",
     className: "h3 fa fa-arrow-left",
     class:"btn btn-dark btn-lg",
     dataFor: "und"
     },
     {
     id: "rdo",
     name: "Redo",
     className: "h3 fa fa-arrow-left",
     class:"btn btn-dark btn-lg",
     dataFor: "rdo"
     },
     {
     id: "del-pth",
     name: "Delete Path",
     className: "h3 fa fa-arrow-left",
     class:"btn btn-dark btn-lg",
     dataFor: "del-pth"
     },
     {
     id: "del-jnct",
     name: "Delete Node",
     className: "h3 fa fa-arrow-left",
     class:"btn btn-dark btn-lg",
     dataFor: "del-jnct"
     },
     {
     id: "clr-all",
     name: "Clear All",
     className: "h3 fa fa-arrow-left",
     class:"btn btn-dark btn-lg",
     dataFor: "clr-all"
     }]
        /* CREATE GRID */
        let k = 0;
        let dom = [];
        for (let i = 0; i < 60; i++) {
            for (var j = 0; j < 60; j++) {
                 k = 100 * i + j;
                dom.push(<div className="grid-item" ref={`${k}`} id ={`${k}`} onClick = {this.clk.bind(this,k)} onMouseOver = {this.mouseOver.bind(this,k)} onMouseOut ={ this.mouseOut.bind(this,k)} >
                </div>)
            } 
        }       
        return(
            <div className="container-fluid content-wrapper">
                <ToastContainer />
                {this.state.showModal ? <ElementDetails x={this.state.selectedX} y={this.state.selectedY} hideModal={this.handleModal} elementName={this.state.selectedElement} nodeVal={this.state.sele} connectedPoints={this.state.connectedPoints} cancel={this.handleCancel} save={this.handleSave} closeLinks={this.finaldelete} remove={this.remove} /> : null}            
              <div className="mb-2 d-flex justify-content-center">
              <h1>  <span class="shadow badge badge-pill badge-secondary text-uppercase">{this.state.buildingName}  {this.state.floor} Floor</span> </h1>
              </div>
                <div className="row">
                <div className="ml-5 col-sm-1">
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
                    className="btn btn-dark enlrg btn-lg"
                    onClick={this.nodeSelect.bind(k,'Rooms')}
                  >
                    <i class="fas fa-person-booth lt-clr"></i>
                  </button>
                  <button
                    type="button"
                    id="junctions"
                    data-tip
                    data-for="junctions"
                    className="btn btn-dark enlrg btn-lg"
                    onClick={this.nodeSelect.bind(k,'Junctions')}
                    style={{padding:'0px'}}
                  >
                    <img src="/assets/images/Junction.svg"   alt="svg-icons" />
                  </button>
                  <button
                    type="button"
                    id="door"
                    data-tip
                    data-for="door"
                    className="btn btn-dark enlrg btn-lg "
                    onClick={this.nodeSelect.bind(k,'Doors')}
                    style={{padding:'0px'}}
                  >
                    <img src="/assets/images/doorresized.svg"  alt="svg-icons" />
                  </button>
                  <button
                    type="button"
                    id="fconnect"
                    data-tip
                    data-for="fconnect"
                    className="btn btn-dark enlrg btn-lg "
                    onClick={this.nodeSelect.bind(k,'FloorConnection')}
                    style={{padding:'0px'}}
                  >
                    <img src="/assets/images/Stairresized.svg"  alt="svg-icons" />
                  </button>
                  <button
                    type="button"
                    id="rroom"
                    className="btn btn-dark enlrg btn-lg"
                    data-tip
                    data-for="rroom"
                    onClick={this.nodeSelect.bind(k,'RestRooms')}
                  >
                    <i class="fas fa-restroom lt-clr"></i>
                  </button>
                  <button
                    type="button"
                    id="services"
                    className="btn btn-dark enlrg btn-lg"
                    data-tip
                    data-for="services"
                    onClick={this.nodeSelect.bind(k,'Services')}
                  >
                    <i class="fa fa-user-circle-o lt-clr"></i>
                  </button>
                  <button
                    type="button"
                    id="back"
                    className="btn btn-info enlrg btn-lg mb-5"
                    data-tip
                    data-for="back"
                    onClick={this.goBack}
                  >
                    <i class="text-dark fas fa-arrow-left"></i>
                  </button>
                </div>
                </div>   
                {lfTooltip.map((item, index) => {
                  return (
                    <div>
                      <ReactTooltip
                        place="right"
                        type="dark"
                        id={item.id}
                        effect="solid"
                      >
                        {item.name}
                      </ReactTooltip>
                    </div>
                  );
                })} 
                {rtTooltip.map((item, index) => {
                  return (
                    <div>
                      <ReactTooltip
                        place="left"
                        type="dark"
                        id={item.id}
                        effect="solid"
                      >
                        {item.name}
                      </ReactTooltip>
                    </div>
                  );
                })}            
                <div className="col-sm-9">
                <div className="d-flex justify-content-center">
                  <MapInteractionCSS>
                    <div id="example2" style={{ background: `url(${config.imgUrl}${this.props.getImage[1]}) 0% 0% / 100% 100% no-repeat` }}>
                      <div className="grid-container ml-4">
                        {dom.map(r => {  return r; })}
                      </div>
                  </div>
                  </MapInteractionCSS>
                </div>
              </div>
              <div className="col-sm-1">
                <div
                  class="ml-2 btn-group-vertical"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    class="btn btn-dark enlrg"
                    id="crt-pth"
                    data-tip
                    data-for="crt-pth"
                    onClick={this.edgeSelect.bind(this,'Links')}
                  >
                    <img src="/assets/images/Creation.svg" alt="svg-icons" />
                  </button>
                  <button
                    type="button"
                    class="btn btn-dark enlrg"
                    id="und"
                    data-tip
                    data-for="und"
                    onClick={this.undo}
                  >
                    <img src="/assets/images/Undo.svg" alt="svg-icons" />
                  </button>
                  <button
                    type="button"
                    class="btn btn-dark enlrg"
                    id="rdo"
                    data-tip
                    data-for="rdo"
                    onClick={this.redo}
                  >
                    <img src="/assets/images/Redo.svg" alt="svg-icons" />
                  </button>
                  <button
                    type="button"
                    class="btn btn-dark enlrg"
                    id="del-pth"
                    data-tip
                    data-for="del-pth"
                    onClick={this.edgeDelete}
                  >
                    <img src="/assets/images/Pathdeletionresized.svg" alt="svg-icons" />
                  </button>
                  <button
                    type="button"
                    class="btn btn-dark enlrg"
                    id="clr-all"
                    data-tip
                    data-for="clr-all"
                    onClick={this.clrAll}
                  >
                    <i class="fa fa-trash lt-clr" />
                  </button>
                  <button type="button" id="save" className="btn btn-info btn-lg enlrg" data-tip data-for="save" onClick={this.savePath}><i class="h2 fa fa-check text-dark"/></button>
                </div>
              </div>
                </div>
                <div className="d-flex flex-row-reverse">
                </div>
            </div>
        )
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

export default connect(mapStateToProps, { login, junctionCoordinates, junctionDetails, savePath, imgDetails, clearPoints,getAllElements,delNode,delPath })(Annotation);