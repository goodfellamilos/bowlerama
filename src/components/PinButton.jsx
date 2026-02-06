import PropTypes from "prop-types";
import { Fab } from "@mui/material";
import { FLOATING_ACTION_BUTTON_STYLE } from "../constants/materialUIStyles";

const PinButton = ({
  playerId,
  numberOfPins,
  disabled = false,
  onClick = (e) => e,
}) => {
  const fabStyle = numberOfPins < 10 ? FLOATING_ACTION_BUTTON_STYLE : {};
  const onButtonClick = () => {
    onClick(playerId, numberOfPins);
  };

  return (
    <Fab
      style={fabStyle}
      disabled={disabled}
      onClick={onButtonClick}
      color="primary"
      size="medium"
    >
      {`${numberOfPins}`}
    </Fab>
  );
};

PinButton.propTypes = {
  playerId: PropTypes.string.isRequired,
  numberOfPins: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default PinButton;
