import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';

const RandomPinsButton = ({ playerId, numberOfPins, onClick }) => {
  const onButtonClick = () => {
    onClick(playerId, numberOfPins);
  };

  return (
    <RaisedButton primary={true} label={'Random Number of Pins'} onClick={onButtonClick} />
  );
};

RandomPinsButton.propTypes = {
  playerId: PropTypes.string.isRequired,
  numberOfPins: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

RandomPinsButton.defaultProps = {
  onClick: e => e
};

export default RandomPinsButton;
