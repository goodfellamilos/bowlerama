const ACTION_TYPES = {
  ADD_PLAYER: 'ADD_PLAYER',
  REMOVE_PLAYER: 'REMOVE_PLAYER',
  REMOVE_ALL_PLAYERS: 'REMOVE_ALL_PLAYERS',
  ROLL: 'ROLL'
};

function addPlayer(playerName, playerId) {
  return {
    type: ACTION_TYPES.ADD_PLAYER,
    playerName,
    playerId
  };
}

function removePlayer(playerId) {
  return {
    type: ACTION_TYPES.REMOVE_PLAYER,
    playerId
  };
}

function removeAllPlayers() {
  return {
    type: ACTION_TYPES.REMOVE_ALL_PLAYERS
  };
}

function roll(playerId, numberOfPins) {
  return {
    type: ACTION_TYPES.ROLL,
    playerId,
    numberOfPins
  };
}

export {
  ACTION_TYPES,
  addPlayer,
  removePlayer,
  removeAllPlayers,
  roll
};
