import React from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import { useCookies } from "react-cookie";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';



const Ec2Form = () => {


  const [instanceType, setInstanceType] = React.useState("");
  const [amiId, setAmiId] = React.useState("");
  const [securityGroup, setSecurityGroup] = React.useState("");
  const [keyPair, setKeyPair] = React.useState("");

  const [cookies, setCookie] = useCookies(["user"]);
  const [instanceList, setInstanceList] = React.useState("");

  const handleAmiChange = (e) => {
    setAmiId(e.target.value);
  };

  let json = {

    'token1': cookies.token1,
    'token2': cookies.token2,
    "imageId": amiId,
    "instanceType": instanceType,
    "securityGroup": securityGroup,
    "keyPairName": keyPair,
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    let url = "http://localhost:8080/home/ec2/createInstance";
    axios.post(url, json).then(function (response) {

      alert('Instance Created..!');
      console.log(response.data);

    })
      .catch(function (error) {

        alert('Instance not created. Check your configuration.');
        console.log(error.trace);
      });
  }






  const onLoading = (event) => {
    axios
      .post("http://localhost:8080/home/ec2/listInstances", json)
      .then(function (response) {
        console.log(response);
        setInstanceList(response.data);
      });
  };
  const logout = () => {
    localStorage.removeItem('token-info');
    setCookie('token1', "");
    setCookie('token2', "");
    setCookie('username', "");
    window.location.href = "/login";

  };


  const mystyle = {
    color: "blue",
    padding: "10px",
    fontFamily: "Arial",
    margin: "auto",
    width: "40%",
    border: "3px solid green",
    padding: "10px",
  };
  const buttons = {
    margin: "auto",
    padding: "50px",
    align: "center",
  };
  let NameOfUser = cookies.username;

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));
  return (
    <React.Fragment>

      <Container maxWidth="false">

        <div style={mystyle}>
          <Div>  Welcome {NameOfUser}! </Div>

          <form onSubmit={handleSubmit}>
            <div style={{ color: "blue", padding: 10 }}>
              <div style={{ paddingLeft: 250 }}>
                <p style={{ align: "center", color: "blue" }}>EC2 Form</p>
              </div>
              <label>
                {" "}
                Enter AMI ID:
                <input
                  type="text"
                  value={amiId}
                  onChange={(e) => setAmiId(e.target.value)}
                />
              </label>
            </div>
            <div style={{ color: "blue", padding: 10 }}>
              <label>
                {" "}
                Enter Instance Type:
                <input
                  type="text"
                  value={instanceType}
                  onChange={(e) => setInstanceType(e.target.value)}
                />
              </label>
            </div>
            <div style={{ color: "blue", padding: 10 }}>
              <label>
                {" "}
                Security Group:
                <input
                  type="text"
                  value={securityGroup}
                  onChange={(e) => setSecurityGroup(e.target.value)}
                />
              </label>
            </div>
            <div style={{ color: "blue", padding: 10 }}>
              <label>
                {" "}
                Key Pair:
                <input
                  type="text"
                  value={keyPair}
                  onChange={(e) => setKeyPair(e.target.value)}
                />
              </label>
            </div>
            <div>
              <Button variant="contained" size="small" type="submit">submit</Button>
            </div>
          </form>
          <p></p>
          <Button variant="contained" color="error" size="small" onClickCapture={logout}>logout user</Button>

        </div>

      </Container>
      <p > </p>
      <Card style={mystyle}>
        <ListGroup variant="flush">
          <div style={{ align: "center !important", paddingLeft: " 200p !important" }}>
            <Button variant="contained" size="small" style={{ align: "center" }} onClick={onLoading}> Show Available Instances </Button>
            <div dangerouslySetInnerHTML={{ __html: instanceList }} />
          </div>


        </ListGroup>
      </Card>

    </React.Fragment>
  );
};

export default Ec2Form;
