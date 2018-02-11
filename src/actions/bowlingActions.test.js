import {
  addPlayer,
  removePlayer,
  removeAllPlayers,
  ACTION_TYPES
} from '../actions/bowlingActions';

const { ADD_PLAYER, REMOVE_PLAYER, REMOVE_ALL_PLAYERS } = ACTION_TYPES;

describe('bowlingActions', () => {
  it('should create an action to Add Player', () => {
    const expectedAction = {
      type: ADD_PLAYER,
      playerName: 'Player Number One',
      playerId: '_playerNumberOne_'
    };
    expect(addPlayer('Player Number One', '_playerNumberOne_')).toEqual(expectedAction);
  });

  it('should create an action to Remove Player', () => {
    const expectedAction = {
      type: REMOVE_PLAYER,
      playerId: '_playerNumberOne_'
    };
    expect(removePlayer('_playerNumberOne_')).toEqual(expectedAction);
  });

  it('should create an action to Remove All Players', () => {
    const expectedAction = {
      type: REMOVE_ALL_PLAYERS
    };
    expect(removeAllPlayers()).toEqual(expectedAction);
  });
});
