import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { REMOVE_ERROR } from "../constants/Constants";

function CustomModal({ consdition }) {
  const dispatch = useDispatch();
  let header, msg;
  if (consdition === "upToLimit") {
    header = "Congratulations!";
    msg = "You have selected all of your five nominations";
  } else if (consdition === "MoreThanLimit") {
    header = "";
    msg =
      "You have already selected five nominations. Please remove other nominations first.";
  } else if (String(consdition) === "Error: Too many results.") {
    header = "";
    msg = " Too many results. Please refine your search";
  } else if (String(consdition) === "Error: Movie not found!") {
    header = "";
    msg = "Movie not found!";
  } else {
    header = "Error!";
    msg = String(consdition);
  }

  const handleClose = () => {
    dispatch({ type: REMOVE_ERROR });
  };
  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ fontSize: "1.5rem" }}>{msg}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModal;
