import React from 'react';
import {HashRouter as Router} from 'react-router-dom';
import Layout from './container/Layout';
import BaseRouter from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render(){
  return (
    <div className="App">
       <Router>
          <BaseRouter/>
        </Router>
    </div>
  );
  }
}

export default App;
