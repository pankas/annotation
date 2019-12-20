import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {login} from '../../store/actions/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AdminLogin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:''
        }
    }
    // id:  735087654086-q0ttc6946sg80ktpl7ges14upnaquonb.apps.googleusercontent.com
    // secret:  0F8flogiKjmsN4-tRZ9Xr9-L
    handleSubmit = (e)=>{
        sessionStorage.clear();

        e.preventDefault();
        const val ={
            "data":{
                username: this.state.username,
                password: this.state.password
            }
        }
        this.props.login(val,()=>{
            let data = Object.keys(this.props.res);
            console.log("usersss",this.props.res)
            if(data[0] === 'error'){
                let msg = this.props.res.error
                    toast.error(msg)
            }else{
            sessionStorage.setItem('isAuthenticated',true)      
                let auth = sessionStorage.getItem('isAuthenticated');
                    this.props.history.push('/blist')                
            }
        })
    }
    render(){
        return(
            <div>
                <div className="container" style={{marginTop:"10%"}}>
                <ToastContainer />
                <div className="card mt-5">
                    <h5 className="card-header">Login</h5>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Username</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})} required />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})} required />
                            </div>
                            <div className="d-flex justify-content-center mb-5">
                                <button type="submit" class="btn btn-success">Submit</button>
                            </div>
                            <div className="d-flex justify-content-between">
                                <Link to="forget-password"><div>Forgot password?</div></Link>
                                <Link to="signup"><div>New? Create an account</div></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps=  (state)=>{
    return{
        login: state.login,
        res: state.users
    }
}

export default connect(mapStateToProps,{login})(AdminLogin);