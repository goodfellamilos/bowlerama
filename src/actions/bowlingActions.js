const ACTION_TYPES = {
  ADD_PLAYER: 'ADD_PLAYER',
  REMOVE_PLAYER: 'REMOVE_PLAYER',
  REMOVE_ALL_PLAYERS: 'REMOVE_ALL_PLAYERS',
};

function addPlayer(playerName) {
  return {
    type: ACTION_TYPES.ADD_PLAYER,
    playerName,
  };
}

function removePlayer(playerIndex) {
  return {
    type: ACTION_TYPES.REMOVE_PLAYER,
    playerIndex,
  };
}

function removeAllPlayers() {
  return {
    type: ACTION_TYPES.REMOVE_ALL_PLAYERS,
  };
}

export {
  ACTION_TYPES,
  addPlayer,
  removePlayer,
  removeAllPlayers,
};
