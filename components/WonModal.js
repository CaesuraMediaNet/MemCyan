import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function WonModal ({numWon, numLost, numClicks, gameTime, numTyles, overallScore}) {
   const [show, setShow]  = useState(true);
   const handleClose = () => setShow(false);
   const handleShow  = () => setShow(true);
   return (
      <Modal show={show} onHide={handleClose} centered>
         <Modal.Header closeButton>
            <Modal.Title>WooHoo, you Won! SCORE : {overallScore}</Modal.Title>
         </Modal.Header>
         <Modal.Body>In {numClicks} clicks and {gameTime} seconds for {numTyles} Tyles.  You lost {numLost} tyles and won {numWon} tyles.</Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
               Close
            </Button>
         </Modal.Footer>
      </Modal>
   );
}

