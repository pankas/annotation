import React from 'react';
import { Link } from 'react-router-dom';

class Layout extends React.Component{
    constructor(props){
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            };
            }
            toggleNavbar() {
            this.setState({
            collapsed: !this.state.collapsed,
            });
    }
    render(){
        const { t } =this.props;
        const collapsed = this.state.collapsed;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
        return(
            <div>
                <nav className="navbar navbar-light bg-light navbar-expand-lg rounded">
                    <a className="navbar-brand" href="#">
                    <i class="fas fa-2x fa-home"></i>
                      Wayfinding
                    </a>
                    <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                         <span className="navbar-toggler-icon" />
                    </button>
                    <div className={`${classOne}`} id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">{t("About Us")}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">{t("How to Use")}</Link>
                        </li>
                    </ul>
                    </div>
                </nav>   
            </div>
        )
    }
}
export default Layout;