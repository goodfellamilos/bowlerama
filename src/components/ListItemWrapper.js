import React from "react";
import PropTypes from "prop-types";
import { ListItem } from "material-ui";
import DeleteButton from "../components/DeleteButton";
import { LIST_ITEM_STYLE } from "../constants/materialUIStyles";

const ListItemWrapper = ({ player, onClick }) => {
  const onButtonClick = () => {
    onClick(player.id);
  };

  return (
    <ListItem
      disableTouchRipple={true}
      style={LIST_ITEM_STYLE}
      primaryText={player.name}
      rightIconButton={<DeleteButton onClick={onButtonClick} />}
    />
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

ListItemWrapper.defaultProps = {
  onClick: (e) => e,
};

export default ListItemWrapper;
