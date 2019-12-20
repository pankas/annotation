import React from 'react';
import { Route } from 'react-router-dom';
import AdminLogin from './components/admin/AdminLogin';
import AdminRegistration from  './components/admin/AdminRegistration';
import ForgetPass from './components/admin/ForgetPass';
import Dashboard from './components/admin/Dashboard';
import GoogleLogin from './components/admin/GoogleLogin';
import AuthRoute from './authRoute';

const BaseRouter = ()=>{
    return(
    <div>   
            <AuthRoute exact path="/admin" component={Dashboard}/>
            <Route exact path="/login" component={GoogleLogin}/>
            <Route exact path="/" component={AdminLogin}/>
            <AuthRoute exact path="/annotate" component={Dashboard}/>
            <Route exact path="/signup" component={AdminRegistration}/>
            <AuthRoute exact path="/fconn" component={Dashboard}/>
            <Route exact path="/forget-password" component={ForgetPass}/>
            <AuthRoute exact path="/details" component={Dashboard}/>
            <AuthRoute exact path="/blist" component={Dashboard}/>
            <AuthRoute exact path="/test1" component={Dashboard}/>            
            
    </div>)
}

export default BaseRouter