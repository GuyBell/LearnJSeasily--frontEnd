import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FCSessionModal from "../Components/FCSessionModal";
import FCStudentModal from '../Components/FCStudensModal'


export default function LobbyPage() {
  const { state } = useLocation();
  const MentorDetails = state;
  const [blockTitles, setblockTitles] = useState([]);
  const [studentDetails, setStudentDetails] = useState([]);
  const [blockIdToPass, setBlockIdToPass] = useState();
  const [urlToPass, seturlToPass] = useState()
  //modal students
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (block_id) => {
    setShow(true);
    setBlockIdToPass(block_id)
  }
  //sessionModal
  const [showSessionModal, setShowSessionModal] = useState(false);
  const handleCloseSessionModal = () => setShowSessionModal(false);
  const handleShowSessionModal = () => {
    setShowSessionModal(true);
  }

  useEffect(() => {
    GetCodeBlocks();
    GetStudentsUsers();
  }, [])

  //Get all the names of the code blocks with an ID number
  const GetCodeBlocks = () => {
    try {
      const url = "https://proj.ruppin.ac.il/bgroup92/test2/tar6/CodeBlocks/GetAllCodeTitles";
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
            //console.log(data);
            if (data.length > 0) {
              setblockTitles(data)
            }
            else {
              setblockTitles([])
            }

          },
          (error) => {
            console.log("err post=", error);
          }
        );
    } catch (error) {
      console.log(error.message);
      console.log(error.stack)
    }
  };

  //Get all the student details
  const GetStudentsUsers = () => {
    try {
      const url = "https://proj.ruppin.ac.il/bgroup92/test2/tar6/Users/getAllStudentsUsers";
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
            // console.log(data);
            if (data.length > 0) {
              setStudentDetails(data)
            }
            else {
              setStudentDetails([])
            }
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


  //Create session and post to DB
  const postSessionDetailes = (student, uuid) => {
    const urlToSession = `https://proj.ruppin.ac.il/bgroup92/test2/tar6/BlockPage/${uuid}`;
    const uuidToNavigate = uuid
    const sessionDetailesToPass = {
      SessionId: uuid,
      BlockId: blockIdToPass,
      UserId: student.UserId,
      MentorId: MentorDetails.UserId,
      Email: student.Email,
      Url: urlToSession
    }

    try {
      const url = "https://proj.ruppin.ac.il/bgroup92/test2/tar6/Sessins/CreateSession";
      fetch(url, {
        method: "POST",
        body: JSON.stringify(sessionDetailesToPass),
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
            // console.log("FETCH PostRequest= ", data);
            seturlToPass(uuidToNavigate);
            handleClose();
            handleShowSessionModal();
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
      <div className='container'>
        <div className='lobbyDiv'>
          {blockTitles.length > 0 ?
            blockTitles.map((block) =>
              <div key={block.BlockId} className='titleBlockDiv' onClick={() => handleShow(block.BlockId)}>
                <h3>{block.Title}</h3>
              </div>
            ) : ("There are no code blocks available in the DB")}
        </div>
        <FCStudentModal
          show={show}
          onHide={handleClose}
          studentDetails={studentDetails}
          postSessionDetailes={postSessionDetailes}
        />
        {urlToPass !== undefined &&
          <FCSessionModal
            show={showSessionModal}
            onHide={handleCloseSessionModal}
            uuid={urlToPass}
            MentorDetails={MentorDetails}
          />
        }
      </div >
    </>
  )

}
