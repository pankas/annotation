import React from 'react';
import {connect} from 'react-redux';
import {forgotPass} from '../../store/actions/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ForgotPass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mail:''
        }
    }

    handleChange = (e)=>{
        this.setState({
            mail: e.target.value
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.forgotPass(this.state.mail,()=>{
            console.log("forgot pass",this.props.fgPass)
            let data = Object.keys(this.props.fgPass);
            if(data[0] === 'error'){
                toast.error("Email id or Employee code already exists")
        }else{
            toast.success('Your password has been sent to your mail')
        }
        })
    }

    render(){
        return(
            <div>
                <ToastContainer />
                <div className="container">
                <div className="card">
                    <h5 className="card-header">Forgot Password</h5>
                    <p class="card-text">Enter your email address</p>
                    <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <input type="email" class="form-control" id="formGroupExampleInput" placeholder="Example input" onChange={this.handleChange}/>
                        <div className="d-flex justify-content-center mb-5">
                            <button type="submit" class="btn btn-success">Submit</button>
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
        fgPass: state.fgPass
    }
}

export default connect(mapStateToProps,{forgotPass})(ForgotPass);