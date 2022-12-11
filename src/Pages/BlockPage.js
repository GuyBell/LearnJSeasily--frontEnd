import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom'

export default function BlockPage() {
  const { sessionId } = useParams()
  const { state } = useLocation();
  const UserDetails = state;
  const navigate = useNavigate();
  const [codeBlockData, setcodeBlockData] = useState()

  const verifyStudent = {
    uuid: sessionId,
    type: "student"
  }
  const url = `https://proj.ruppin.ac.il/bgroup92/test2/tar6/Sessins/GetDetailsSession/`;

  useEffect(() => {
    getSessionData()
  }, [])

  const getSessionData = () => {
    try {
      const url = `https://proj.ruppin.ac.il/bgroup92/test2/tar6/Sessins/GetDetailsSession/${sessionId}`;
      fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          "Accept": "application/json; charset=UTF-8",
        }),
      })
        .then((res) => {
          // console.log("res.ok", res.ok);
          return res.json();
        })
        .then(
          (data) => {
            // console.log("data", data);
            setcodeBlockData(data)
          },
          (error) => {
            console.log("err post=", error);
          }
        );
    } catch (error) {
      console.log(error.message);
      console.log(error.stack)
    }
  }

  return (
    <>
      {(UserDetails != undefined && UserDetails.Type == "M") ?
        <>
          <h3>Mentor Side</h3>
          {codeBlockData !== undefined ? (
            <div className="blockCodeConrainer">
              <h1 style={{ paddingTop: 50, paddingBottom: 10 }}>Complete the missing line - {codeBlockData.Title}</h1>
              <textarea disabled className="blockCode" name={codeBlockData.Title} value={codeBlockData.Code}></textarea>
            </div>
          ) : ("")}
        </>
        :
        <>
          {UserDetails == undefined && navigate("/", { state: verifyStudent })}
          <h3>Student Side</h3>
          {codeBlockData !== undefined ? (
            <div className="blockCodeConrainer">
              <h1 style={{ paddingTop: 50, paddingBottom: 10 }}>Complete the missing line - {codeBlockData.Title}</h1>
              <textarea className="blockCode" name={codeBlockData.Title} defaultValue={codeBlockData.Code}></textarea>
            </div>
          ) : ("")}
        </>
      }
    </>
  )
}

//is="highlighted-code" cols="80" rows="12" language="javascript" tab-size="2" auto-height