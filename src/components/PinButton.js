import React from 'react';
import PropTypes from 'prop-types';
import { FloatingActionButton } from 'material-ui';
import { FLOATING_ACTION_BUTTON_STYLE } from '../constants/materialUIStyles';

const PinButton = ({ playerId, numberOfPins, disabled, onClick }) => {
  const floatingActionButtonStyle = numberOfPins < 10 ? FLOATING_ACTION_BUTTON_STYLE : {};
  const onButtonClick = () => {
    onClick(playerId, numberOfPins);
  };

  return (
    <FloatingActionButton style={floatingActionButtonStyle} disabled={disabled} onClick={onButtonClick}>
      {`${numberOfPins}`}
    </FloatingActionButton>
  );
};

PinButton.propTypes = {
  playerId: PropTypes.string.isRequired,
  numberOfPins: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

PinButton.defaultProps = {
  onClick: e => e
};

export default PinButton;
