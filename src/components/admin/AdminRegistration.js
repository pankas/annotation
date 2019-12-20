import React from 'react';
import {connect} from 'react-redux';
import {signup} from '../../store/actions/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AdminRegistration extends React.Component{
    constructor(props){
        super (props);
        this.state = {
            firstname:'',
            lastname:'',
            email:'',
            employeeID:'',
            password1:'',
            password2:''
        }
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        const val ={
            "data":{
                firstname: this.state.firstname,   
                lastname: this.state.lastname,  
                email: this.state.email,       
                employee_id: this.state.employeeID,    
                password1: this.state.password1,
                password2: this.state.password2
            }
        }

        if(this.state.password1 !== this.state.password2){
            toast.error("Confirm password does not match with the password you have entered")
        }else{
            this.props.signup(val,()=>{
                let data = Object.keys(this.props.res);
                if(data[0] === 'error'){
                        toast.error("Email id or Employee code already exists")
                }else{
                    toast.success(`Your username and password has been sent to your mail`)
                    let that = this
                    setTimeout(function(){
                                    that.props.history.push('/')
                    }, 6000);
                }
            })
        }
    }

    render(){
        return(
            <div className="container">
              <ToastContainer />
                <div className="card">
                    <h5 className="card-header">Registration</h5>
                    <div className="card-body d-flex flex-column">
                        <form name="registration" onSubmit={this.handleSubmit}>
                            <div className="form-group flex-fill">
                                <label for="name">Name</label>
                                <div className="d-flex flex-row">
                                    <input type="text" className="form-control mr-1" id="name" name="first_name"  placeholder="First Name" value={this.state.firstname} onChange={(e)=>this.setState({firstname:e.target.value})} required/>
                                    <input type="text" className="form-control" id="name"  placeholder="Last Name" value={this.state.lastname} onChange={(e)=>this.setState({lastname:e.target.value})} required />                            
                                </div>
                            </div>
                            <div className="form-group flex-fill">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" name="email" placeholder="Enter email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} required />
                            </div>
                            <div className="form-group flex-fill">
                                <label for="employeeid">Employee ID</label>
                                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter employee ID" value={this.state.employeeID} onChange={(e)=>this.setState({employeeID:e.target.value})} required />
                            </div>
                            <div className="form-group flex-fill">
                                <label for="password">Password</label>
                                <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={this.state.password1} onChange={(e)=>this.setState({password1:e.target.value})} required />
                            </div>
                            <div className="form-group flex-fill">
                                <label for="confirm">Confirm Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" name="confirm_password" placeholder="Confirm Password" value={this.state.password2} onChange={(e)=>this.setState({password2:e.target.value})} required />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" class="btn btn-success" id="submitButton">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        signupData: state.signup,
        res: state.users
    }
}

export default connect(mapStateToProps,{signup})(AdminRegistration);