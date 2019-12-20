import React from 'react';
import { connect } from 'react-redux';
import { login, adminDetails,floorList,delFlr } from '../../store/actions/index';
import Upload from './Upload';

class FloorList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            displayModal: false,
            buildingName:'',
            cFloor:false
        }
        this.cFloor = false
    }

    showModal = (e) => {
        this.setState({
            displayModal: true
        })
    }

    connectFloor = ()=>{
        this.props.history.push({
            pathname: '/fconn',
            search: `?${this.state.buildingName}`,
        })
    }

    componentWillMount() {
        let url = window.location.href
        let arr = url.split('?');
        this.setState({
            buildingName: arr[1]
        })
        let name = arr[1]
        let username = this.props.users.firstname + this.props.users.lastname;
        this.props.floorList(username,name,()=>{
            if(this.props.lists.length >=2){
                this.setState({
                    cFloor:true
                })
            }     
        })
    }

    renderTable = (row, index) => {
        if(this.props.lists.length >=2){
            this.cFloor = true
        }
        return <tr key={index} onClick={this.showDetails.bind(this,row.buildingName,row.floor,row.fileName)} >
            <td scope="row">{index}</td>
            <td>{row.floor}</td>
            {/* <td>{row.mapversion}</td> */}
            <td className="text-danger"><i className="fa fa-trash" aria-hidden="true"></i></td>
        </tr>;
    }

    showDetails = (name,floor,file)=>{
            this.props.history.push({
                pathname: '/annotate',
                search: `?query=${name}&&floor:${floor}:${file}`,
            })
    }
    delete = (bname,flr)=>{
        this.props.delFlr(bname,flr,()=>{
            let uname = localStorage.getItem('username')
            this.props.floorList(uname,bname,()=>{
            })
        });
    }


    hideModal =(bool)=>{
        this.setState({
            displayModal: false
        })
    }

    render() {
        return (
            <div className="content-wrapper">
                <section class="hero is-primary">
                    <div class="hero-body">
                        <div class="container">
                            <h1 class="title">
                                <strong>Building Name: {this.state.buildingName}</strong>
                            </h1>
                            <div>
                                <p id="temporary"></p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container-fluid" style={{ padding: "5%" }} >
                    {this.state.displayModal ? <Upload bName={this.state.buildingName} hide={this.hideModal} /> : null}
                    <br />
                    <div className="row table-responsive">
                        <table className="table table-hover" style={{ marginLeft: "2%" }}>
                            <thead style={{ fontSize: "0.77rem" }}>
                                <tr>
                                    <th scope="col" >ID</th>
                                    <th scope="col" ><i className="fa fa-fw fa-sort"  ></i> FLOOR </th>
                                    {/* <th scope="col" ><i className="fa fa-fw fa-sosubmitBuildingrt"  ></i>MAP VERSION</th> */}
                                    <th scope="col" ><i className="fa fa-fw fa-sort"  ></i> DELETE MAP </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.lists.map((list,index) => {
                                    return    <tr key={index}  >
                                        <td>{index}</td>
                                        <td onClick={this.showDetails.bind(this,list.buildingName,list.floor,list.fileName)}>{list.floor}</td>
                                        {/* <td>{row.mapversion}</td> */}
                                        <td onClick={this.delete.bind(this,list.buildingName,list.floor)}><i className="text-dark fa fa-times" aria-hidden="true"></i></td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex mt-2">
                    <button className="btn btn-sm btn-success mr-2" type="button" onClick={this.showModal}>Add New Floor</button>
                    {this.state.cFloor?<button className="btn btn-sm btn-primary" type="button" onClick={this.connectFloor}>Connect Floor</button>:null}
                    </div>
                    <br />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lists: state.floorList,
        users: state.users,
        getPoints: state.mapDetails
    }
}

export default connect(mapStateToProps, { login, adminDetails,floorList,delFlr })(FloorList);