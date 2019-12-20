import React from 'react';
import config from '../../config';
import {GoogleLogin} from 'react-google-login';

class SocialLogin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isSignedIn: false,
        }
    }
    
    login = (response)=>{
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken,profileObj:response.profileObj}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch(config.googleLogin, options).then(r => {
            r.json().then(res=>{
                localStorage.clear()
                localStorage.setItem('username',res.username)
                localStorage.setItem('id',res.id)
                sessionStorage.setItem('isAuthenticated',true)
                this.props.history.push('/blist')
            })
        })
    }

    componentDidMount(){
        localStorage.clear();
    }

    render(){
        return(
            <div>
            <div className="container" style={{marginTop:"10%"}}>
            <div className="card mt-5" style={{height:"50vh"}}>
                <div className="card-header bg-secondary d-flex justify-content-center text-white"><h2>Innav</h2></div>
                <div className="card-body bg-dark d-flex flex-column justify-content-center">
                <div class="row">
                  <div class="col">
                    <h4 class="card-title text-white text-capitalize">Welcome to innav annotation tool</h4>
                        <p class="card-text text-white"> Make indoor navigation smooth and accessible</p>
                  </div>
                  <div class="col ml-5">
                    <GoogleLogin
                          clientId={config.clientId}
                          mode="uxmode"
                          buttonText='Signup/Login with google'
                          onSuccess={this.login}
                          onFailure={(data)=>{
                              console.warn("on failure",data)
                           }}
                          responseType={'token'}
                          accessType='offline'
                          cookiePolicy={'single_host_origin'}
                          redirectUri={config.redirect}
                      />
                  </div>
                  <div class="w-100"></div>
                </div>
                </div>
            </div>
        </div>
        </div>
        )
    }
}

export default SocialLogin;