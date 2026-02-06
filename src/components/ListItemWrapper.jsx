import PropTypes from "prop-types";
import { ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";
import DeleteButton from "../components/DeleteButton";
import { LIST_ITEM_STYLE } from "../constants/materialUIStyles";

const ListItemWrapper = ({ player, onClick = (e) => e }) => {
  const onButtonClick = () => {
    onClick(player.id);
  };

  return (
    <ListItem style={LIST_ITEM_STYLE}>
      <ListItemText primary={player.name} />
      <ListItemSecondaryAction>
        <DeleteButton onClick={onButtonClick} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

ListItemWrapper.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    scores: PropTypes.array.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ListItemWrapper;
