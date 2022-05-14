import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useCookies } from "react-cookie";
import axios from "axios";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";




const BasicSelect = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  console.log("hello on load");

  const mystyle = {
    color: "blue",
    padding: "10px",
    fontFamily: "Arial",
    margin: "auto",
    width: "50%",
    border: "3px solid green",
    paddingLeft: "100px",
  };
  const mystyle1 = {
    color: "blue",
    padding: "10px",
    fontFamily: "Arial", 
    width: "50%",
    paddingLeft: "-1px",
  };
  const buttons = {
    marginleft: "auto",
    padding: "50px",
    paddingBottom: "10px",
    paddingLeft: "10px",
  };

  const [bucketName, setBucketName] = React.useState([]);
 const [bucketList, setBucketList] = React.useState("");
  let handleBucketNameChange = (e) => {
    setBucketName(e.target.value);
  };

  const [cookies, setCookie] = useCookies(["user"]);
  console.log(cookies);

  let req = {
    token1: cookies.token1,
    token2: cookies.token2,
  };

  let listOfBuckets;
  let listLen = 0;
  const bucketMap = new Map();

  axios
    .post("http://localhost:8080/home/s3/getBucketList", req)
    .then(function (response) {
      console.log(response);
      setBucketList(response.data);
      listOfBuckets = response.data;
      console.log(listOfBuckets.length);
     
    })
    .catch(function (error) {
      console.log(error);
    });
  
  console.log(listOfBuckets);

  const [selectedFile, setSelectedFile] = React.useState(null);
  console.log(cookies);

  const handleSubmit = (event) => {

    var dropdownValue = document.getElementById('bucket-selection');
    event.preventDefault()
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("token1", cookies.token1);
    formData.append("token2", cookies.token2);
    formData.append("bucketName" , dropdownValue.options[dropdownValue.selectedIndex].text);
    let url = "http://localhost:8080/home/s3/putObject";
    console.log(formData);

    axios.post(url, formData).then(function (response) {
      console.log(response.data);

      
      alert(response.data + " uploaded to Bucket: "+dropdownValue.options[dropdownValue.selectedIndex].text);
    })
    .catch(function (error) {
      
      alert('File not uploaded..!');
      console.log(error);
    });

  };

  

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  let navigate = useNavigate(); 

  const logout = () => {
    localStorage.removeItem('token-info');
    setCookie('token1', "");
    setCookie('token2', "");
    setCookie('username', "");
    window.location.href = "/login";
}
  let NameOfUser = cookies.username;

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

  return (
    <Box style={mystyle} sx={{ minWidth: 120 }}>
      <Div>  Welcome {NameOfUser}! </Div>
      <FormControl fullWidth onChange= {handleBucketNameChange}>
        <InputLabel style={mystyle1} id="demo-simple-select-label">
          {" "}
          Select Bucket Name
        </InputLabel>

        <div style={buttons} dangerouslySetInnerHTML={{ __html: bucketList }} />


      </FormControl >
      <form onSubmit={handleSubmit}>
        <p style = {{mystyle1}}>  Select File to Upload</p>
      
      <input type="file" onChange={handleFileSelect} />
      <input type="submit"  value="Upload File" />
    </form>
    <p></p>
    <Button variant="contained" color="error" size="small" onClickCapture={logout}>logout user</Button>

    </Box>
  );
};
export default BasicSelect;
