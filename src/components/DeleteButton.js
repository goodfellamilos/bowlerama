import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'material-ui';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import { ICON_BUTTON_STYLE } from '../constants/materialUIStyles';

const DeleteButton = ({ onClick }) => (
  <IconButton
      style={ICON_BUTTON_STYLE}
      tooltip={'Remove player'}
      tooltipPosition={'top-left'}
      onClick={onClick} >
    <ActionDelete />
  </IconButton>
);

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

DeleteButton.defaultProps = {
  onClick: e => e
};

export default DeleteButton;
