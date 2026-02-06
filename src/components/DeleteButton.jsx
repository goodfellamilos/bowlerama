import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteButton = ({ onClick = (e) => e }) => (
  <Tooltip title="Remove player" placement="top-start">
    <IconButton onClick={onClick} size="small">
      <DeleteIcon />
    </IconButton>
  </Tooltip>
);

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
