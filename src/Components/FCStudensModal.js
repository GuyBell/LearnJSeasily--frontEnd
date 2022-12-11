import React from 'react'
import Modal from 'react-bootstrap/Modal';
import uuid from 'react-uuid';

export default function FCStudensModal({ onHide, show, studentDetails, postSessionDetailes }) {  
  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton onClick={onHide}>
          <Modal.Title >Select a student to create a session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {studentDetails.length > 0 ?
            studentDetails.map(s =>
              <div key={s.UserId} className='nameModalDiv' onClick={() => postSessionDetailes(s, uuid())}>{s.FullName}</div>
            )
            : "There are no students in DB"}
        </Modal.Body>
      </Modal>
    </>
  )
}