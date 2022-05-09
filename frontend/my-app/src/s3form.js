import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FileUpload from './fileUpload';
import { useCookies } from 'react-cookie';
import axios from 'axios';



const BasicSelect = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  console.log('hello on load');

  const mystyle = {
    color: "blue",
    padding: "10px",
    fontFamily: "Arial",
    margin: "auto",
    width: "50%",
    border: "3px solid green",
    padding: "10px",

  };
  const buttons = {
    margin: "auto",
    padding: "50px",
    align: "center"


  }

  const [bucketName, setBucketName] = React.useState([]);

  let handleBucketNameChange = (e) => {
    setBucketName(e.target.value)
  }
  


  const [cookies, setCookie] = useCookies(['user']);
  console.log(cookies);

  let req = {
    "token1": cookies.token1,
    "token2": cookies.token2,
}

  let listOfBuckets;
  let listLen=0;
  const bucketMap = new Map();


  axios.post('http://localhost:8080/home/s3/getBucketList', req)
      .then(function (response) {
        console.log(response);
  
        listOfBuckets = response.data;
        console.log(listOfBuckets.length)
        listLen = listOfBuckets.length;
        console.log(typeof(listOfBuckets));

      for(let i=0; i< listLen;i++){
        bucketMap.set(listOfBuckets[i],listOfBuckets[i]);

      }
      console.log(bucketMap.get('coms-559-bucket'));

     

        console.log('Response Code: '+response.status);
        console.log(listOfBuckets[0]);
        
       
        
      
        
      })
      .catch(function (error) {
        
        //alert('Invalid Credentials');
        console.log(error);
      });

      
    //  {listOfBuckets.map((item) => <option value={item}>{item}</option>)}


  return (
   
    <Box  style = {mystyle} sx={{ minWidth: 120 }}>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Bucket Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleBucketNameChange}
        >
            {listOfBuckets.map( (x,y) => <option key={y}>{x}</option> )}
        </Select>
      </FormControl>
      <FileUpload />
    </Box>
    
    
  );
}
export default BasicSelect ; 


