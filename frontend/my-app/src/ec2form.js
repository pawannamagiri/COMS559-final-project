import React from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import { useCookies } from "react-cookie";

const Ec2Form = () => {
  //   const [formValue, setFormValue] = React.useState({
  //     AmiId: 'aa',
  //     InstanceType: '',
  //     SecurityGroup: '',
  //     KeyPair: ''
  //   });

  const [instanceType, setInstanceType] = React.useState("");
  const [amiId, setAmiId] = React.useState("");
  const [securityGroup, setSecurityGroup] = React.useState("");
  const [keyPair, setKeyPair] = React.useState("");

  const [cookies, setCookie] = useCookies(["user"]);

  const handleAmiChange = (e) => {
    setAmiId(e.target.value);
  };

  let json = {

    'token1' : cookies.token1,
    'token2' : cookies.token2,
    "imageId": amiId,
    "instanceType": instanceType,
    "securityGroup": securityGroup,
    "keyPairName": keyPair,
  };
  const handleSubmit = (event) => {
    // we will fill this in the coming paragraph
    event.preventDefault();

    console.log(json);
    let url = "http://localhost:8080/home/ec2/createInstance";
    axios.post(url, json).then((res) => {
      // then print response status
      console.warn(res);
    });
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
  return (
    <React.Fragment>
      <Container maxWidth="false">
        <div style={mystyle}>
          <form onSubmit={handleSubmit}>
            <div style={{ color: "blue", padding: 10 }}>
              <div style={{ paddingLeft: 250 }}>
                <p>EC2 Form</p>
              </div>
              <label>
                {" "}
                Enter AMI ID:
                <input
                  type="text"
                  name="email"
                  // placeholder="Enter Ami Id"
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
                  //name="password"
                  //placeholder="Enter Instance Type"
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
                  //name="password"
                  //placeholder="Security Group"
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
                  name="password"
                  // placeholder="Security Group"
                  value={keyPair}
                  onChange={(e) => setKeyPair(e.target.value)}
                />
              </label>
            </div>
            <div>
              <button type="submit">submit</button>
            </div>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Ec2Form;
