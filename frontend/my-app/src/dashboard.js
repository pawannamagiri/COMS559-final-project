import React from "react";
import AlertDialog from "./alertDialog";
import BasicSelect from './s3form';
import Ec2Form from './ec2form';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

  
const Dashboard = () => {

  let navigateS3 = useNavigate(); 
  const routeChangeS3 = () =>{ 
    let path = `/s3form`; 
    navigateS3(path);
  }
  let navigateEC2 = useNavigate(); 
  const routeChangeEc2 = () =>{ 
    let path = `/ec2form`; 
    navigateEC2(path);
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <Stack spacing={2} direction="row">

        
      <Button variant="contained" 
            onClick={routeChangeS3}
              >
              S3 Service
            </Button>
            <Button variant="contained"
            onClick={routeChangeEc2}
              >
              EC2 Service
            </Button>
            </Stack>
      
    </div>
   
    
  );
};
  
export default Dashboard;