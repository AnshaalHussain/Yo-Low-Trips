// import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

/*** Material Ui ***/
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./FlightCodesModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 300,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  paddingLeft: 5
};


// FlightCodesModal is a child of InputCity
export default function FlightCodesModal(props) {
  let history = useHistory();
  const handleOpen = () => props.setOpen(true);
  const handleClose = () => props.setOpen(false);

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-text" sx={style}>
          {props.flightCodeData.map((airports, index) => {
            return (
              <div key={index}>
                <p>{airports.airport_name} </p>
                <Button
                  className="searchButton"
                  variant="contained"
                  onClick={() => {
                    history.push(`/flights/${airports.airport_code}`);
                  }}
                >
                  {airports.airport_code}
                </Button>
              </div>
            );
          })}
        </Box>
      </Modal>
    </div>
  );
}
