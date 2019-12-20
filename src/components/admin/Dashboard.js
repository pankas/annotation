import React from 'react';
import { BrowserRouter, Link, Route, NavLink } from 'react-router-dom';
import FloorList from './FloorList';
import BuildingList from './BuildingList';
import ConnectFloor from './ConnectFloor';
import ReactTooltip from 'react-tooltip';
import Sessions from './Sessions';
import DomMap from './DomMap';
import Annotation from './Annotation';

const routes = [{
    path: "/details",
    component: FloorList,
},{
    path: "/blist",
    component: BuildingList,
},{
    path: "/fconn",
    component: ConnectFloor,
},
{
    path: "/test1",
    component: DomMap,
},{
    path: "/annotate",
    component: Annotation,
}];

const routing = [{
    id: "dashboard",
    name: "Dashboard",
    path: "/blist",
    component: BuildingList,
    className: " text-secondary h3 fas fa-home",
    dataFor: "dashboard",
},
{
    id: "admin",
    name: "View Sessions",
    path: "/sessions",
    component: Sessions,
    className: "text-secondary h3 fa fa-crosshairs",
    dataFor: "admin"
},
{
    id: "support",
    name: "Support",
    path: "/support",
    component: DomMap,
    className: "text-secondary  h3 fa fa-question-circle",
    dataFor: "support"
}]

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            path: null,
        }
    }

    logout = ( )=>{
        localStorage.clear();
        sessionStorage.clear();
        this.props.history.push('/')
    }

    isActive = (path, match, location) => !!(match || path === location.pathname);

    render() {
        const routeComponents = routes.map(({
            path, component, i }) => <Route path={path} component={component} key={i} />);
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <div>
                            <nav className="custom-navbar default-layout-navbar navbar-dark bg-light fixed-top navigation" style={{padding:"0px",height:"10%"}}>
                                <Link className="navbar-brand ml-2" to='/dashboard'>
                                    <img src="/assets/images/innav4.png" width="100" height="75" alt=""/>
                                </Link>
                                <div className="navbar-menu-wrapper d-flex align-items-stretch">
                                    <ul className="navbar-nav navbar-nav-right">
                                        <li className="nav-item" onClick={this.logout}>
                                            <button type="button" class="btn btn-dark">
                                              Logout <span class="badge badge-secondary"><i className="fa fa-power-off" /></span>
                                            </button>
                                            {/* <Link className="nav-link" to="/" onClick={this.logout} style={{ paddingTop: "30px" }}> */}
                                                {/* <i className="h2 fa fa-power-off mr-5" /> */}
                                            {/* </Link>        */}
                                        </li>
                                    </ul>
                                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                                        <span className="mdi mdi-menu" />
                                    </button>
                                </div>
                            </nav>
                            <div className="content-container page-body-wrapper" style={{paddingLeft:"0px !important"}}>
                                <nav className="sidebar sidebar-offcanvas sticky fixed-left">
                                    <div className="v1">
                                        <ul className="nav">
                                            {
                                                routing.map((item, index) => {
                                                    return (
                                                        <li key={index} className={`nav-item ${this.state.path === item.path ? "active" : ""}`} >
                                                            <ReactTooltip place="right" type="dark" id={item.id} effect="solid"> {item.name} </ReactTooltip>
                                                            <Link onClick={() => this.setState({ path: item.path, activeLink: index })} className="nav-link" isActive={this.isActive.bind(this, item.path)} id={item.id} to={item.path} data-tip data-for={item.dataFor}>
                                                                <i className={item.className} />
                                                            </Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                            <div className="clearfix" />
                                        </ul>
                                    </div>
                                </nav>
                                <div className="main-panel">
                                    <div className="main-div">
                                {routeComponents}
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default Dashboard;