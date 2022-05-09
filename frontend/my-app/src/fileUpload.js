import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { withCookies } from "react-cookie";
import { useCookies } from "react-cookie";

// class FileUpload extends React.Component {

//   constructor() {
//     super();
//     this.state = {
//       selectedFile: "", user: this.props.cookies.get("user") || ""
//     };

//     this.handleInputChange = this.handleInputChange.bind(this);
//   }

//   handleInputChange(event) {
//     this.setState({
//       selectedFile: event.target.files[0],
//     });
//   }

//   submit() {
//     let token1,token2;

//     const { user } = this.state;

//     token1 = user.token1;

//       console.log("qwertyuiop " + token1);
//     var config = {};
//     const data = new FormData();
//     data.append("file", this.state.selectedFile);
//     // data.append('token1',cookies.token1);
//     // data.append(
//     //   "token2",
//     //   cookies.token2);
//     let url = "http://localhost:8080/home/s3/putObject";

//     axios.post(url, data, {}).then((res) => {
//       // then print response status
//       console.warn(res);
//     });
//   }

//   render() {
//     return (
//       <div>
//         <div className="row">
//           <div className="col-md-6 offset-md-3">
//             <br />
//             <br />

//             <br />
//             <div className="form-row">
//               <div className="form-group col-md-6">
//                 <label className="text-white">Select File :</label>
//                 <input
//                   type="file"
//                   className="form-control"
//                   name="upload_file"
//                   onChange={this.handleInputChange}
//                 />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="col-md-6">
//                 <button
//                   type="submit"
//                   className="btn btn-dark"
//                   onClick={() => this.submit()}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// export default function FileUpload() {
//   // a local state to store the currently selected file.
//   const [selectedFile, setSelectedFile] = React.useState(null);
//   const [cookies, setCookie] = useCookies(["user"]);
//   console.log(cookies);

// //   let req = {
// //     token1: cookies.token1,
// //     token2: cookies.token2,
// //   };

//   const handleSubmit = (event) => {
//     //event.preventDefault()
//     const formData = new FormData();
//     formData.append("selectedFile", selectedFile);
//     formData.append('token1' , cookies.token1);
//     formData.append("token2",cookies.token2);
//     let url = "http://localhost:8080/home/s3/putObject";

//     axios.post(url, formData).then((res) => {
//       // then print response status
//       console.warn(res);
//     });

//     const handleFileSelect = (event) => {
//       setSelectedFile(event.target.files[0]);
//     };

//     return (
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileSelect} />
//         <input type="submit" value="Upload File" />
//       </form>
//     );

// };

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [cookies, setCookie] = useCookies(["user"]);
  console.log(cookies);

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("token1", cookies.token1);
    formData.append("token2", cookies.token2);
    let url = "http://localhost:8080/home/s3/putObject";

    axios.post(url, formData).then((res) => {
      // then print response status
      console.warn(res);
    });
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect} />
      <input type="submit" value="Upload File" />
    </form>
  );
};

export default FileUpload;
