import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const RandomPinsButton = ({ playerId, numberOfPins, onClick = (e) => e }) => {
  const onButtonClick = () => {
    onClick(playerId, numberOfPins);
  };

  return (
    <Button variant="contained" color="primary" onClick={onButtonClick}>
      {"Random Number of Pins"}
    </Button>
  );
};

RandomPinsButton.propTypes = {
  playerId: PropTypes.string.isRequired,
  numberOfPins: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RandomPinsButton;
