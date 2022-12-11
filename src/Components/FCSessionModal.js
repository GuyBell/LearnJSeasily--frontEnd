import React from 'react'
import { ModalFooter, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FCSessionModal({ onHide, show, uuid, MentorDetails }) {

  const navigate = useNavigate();
  const url = `https://proj.ruppin.ac.il/bgroup92/test2/tar6/ReactProj/#/BlockPage/${uuid}`;

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(url)
    toast.success('The Link Copied, Send the link to the student')
  };


  return (
    <>
      < ToastContainer />
      <Modal show={show}>
        <Modal.Header closeButton onClick={onHide}>
          <Modal.Title >Click the link to open the session</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalSession' onClick={() => navigate(`/BlockPage/${uuid}`, { state: MentorDetails })} >
            {url}
        </Modal.Body>
        <ModalFooter>
          <Button variant="outline-success" onClick={() => copyToClipBoard()}>Copy link</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
