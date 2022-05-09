
import ReactDOM from 'react-dom';
import './index.css';


import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from './dashboard';
import { Link } from 'react-router-dom';
import Login from './login';
import BasicSelect from './s3form';
import Ec2Form from './ec2form';





const App = function() {

  

  

  return(
    <div>
      <h1>AWS</h1>
      
      
     
      <Router>
        <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path="/" component={App} />

          <Route path="/login" element={<Login/>} />
            
          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
          <Route path="/dashboard" element={<Dashboard/>} />

          <Route path ="/s3form" element = {<BasicSelect />} />

          <Route path ="/ec2form" element = {<Ec2Form/>} />
            
    
          
        </Routes>
        <Link id='login-link' to="/login">Login</Link>
        <Link id ='dash-link' to="/dashboard">Dashboard</Link>
        <Link id ='S3' to="/s3form">S3</Link>
        <Link id ='Ec2' to="/ec2form">EC2</Link>


        
        
      </Router>
      
      
     
    </div>
    
  );
  
}



ReactDOM.render(
  <App/>,
  document.querySelector('#root')
);
