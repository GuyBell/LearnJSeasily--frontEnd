import { React, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import javascriptLogo from '../img/javascriptLogo.jpg'

export default function LoginPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const verifyStudent = state;
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("")
  const [Password, setPassword] = useState("");

  const VerifyMentor = () => {
    try {
      const Url = "https://proj.ruppin.ac.il/bgroup92/test2/tar6/Users/LoginUser";
      const user = {
        Email: userName,
        Password: Password,
      };
      fetch(Url, {
        method: "POST",
        body: JSON.stringify(user),
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          "Accept": "application/json; charset=UTF-8",
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then(
          (data) => {
            if (data.Type === "M") {
              navigate("/LobbyPage", { state: data })
            }
            else {
              MassegeErrorLogin();
            }
          },
          (error) => {
            console.log("err post=", error);
          }
        );
    } catch (error) {
      console.log(error.message)
      console.log(error.stack)
    }
  };

  const VerifyStudentForSession = () => {
    try {
      const Url = "https://proj.ruppin.ac.il/bgroup92/test2/tar6/Users/LoginStudentUser";
      const user = {
        UserId: userId,
        Password: Password,
        Uuid: verifyStudent.uuid
      };
      fetch(Url, {
        method: "POST",
        body: JSON.stringify(user),
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          "Accept": "application/json; charset=UTF-8",
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then(
          (data) => {
            if (data === "approved student") {
              navigate(`/BlockPage/${user.Uuid}`, { state: user })
            }
            else {
              MassegeErrorLogin();
            }
          },
          (error) => {
            console.log("err post=", error);
          }
        );
    } catch (error) {
      console.log(error.message)
      console.log(error.stack)
    }
  };

  const MassegeErrorLogin = () => {
    document.getElementById("errMsgLogin").style.display = "block";
  };

  return (
    <div className='container'>
      <div className='loginDiv'>
        <div style={{ marginTop: 25 }}>Login Details</div>
        {/* Student verification will be done using an ID, unlike a mentor who will sign in with an email */}
        {verifyStudent != undefined && verifyStudent.type == "student" ?
          <input className='loginInput' placeholder='User ID' onChange={(e) => setUserId(e.target.value)}></input>
          :
          <input className='loginInput' placeholder='User Name' onChange={(e) => setUserName(e.target.value)}></input>
        }
        <br />
        <input className='loginInput' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input><br />
        <div id="errMsgLogin" style={{ display: "none", margin: "0 auto", color: "red" }}>
          One or more login details are incorrect
        </div>
        {verifyStudent != undefined && verifyStudent.type == "student" ?
          <button className='btnLogin' onClick={() => VerifyStudentForSession()}>CONNECT</button>
          :
          <button className='btnLogin' onClick={() => VerifyMentor()}>CONNECT</button>
        }
        <br /><br />
        <img src={javascriptLogo} alt='logo' style={{ width: '130px' }} />
      </div>
    </div>
  )
}
