import React from "react";
import AlertDialog from "./alertDialog";
  
const Dashboard = () => {

    const axios = require('axios');

    let req = {
        "token1": "gZMlivUH5RbUu/shSJvkKeZlKbg2mdjuyP5n6t1X+xI=",
        "token2": "ZJaGxaR+HPmdJkTGEvXFEkOgizQM4IqM9WcXu02Ylid8D1G3IDZYgGC/hgSz4DNo",
        "username": "Dharma"
    }
    
      axios.post('http://localhost:8080/home/s3/getBucketList', req)
          .then(function (response) {
            console.log(response);
      
            
    
            console.log('Response Code: '+response.status);
            
           
            
          
            
          })
          .catch(function (error) {
            
            alert('Invalid Credentials');
            console.log(error);
          });

  return (
    <div>
      <h1>Dashboard</h1>

      <AlertDialog></AlertDialog>
    </div>
   
    
  );
};
  
export default Dashboard;