import bowlingReducer from './bowlingReducer';
import { ACTION_TYPES } from "../actions/bowlingActions";

const { ADD_PLAYER, REMOVE_PLAYER, REMOVE_ALL_PLAYERS } = ACTION_TYPES;

const initialState = {
  players: []
};

const updatedState = {
  players: ['Test Player One', 'Test Player Two']
};

describe('bowlingReducer', () => {
  it('should return the initial state', () => {
    expect(bowlingReducer(initialState, {})).toEqual(initialState);
  });

  it('should return new state for ADD_PLAYER action', () => {
    expect(bowlingReducer(initialState, {
      type: ADD_PLAYER,
      playerName: 'Test Player One'
    })).toEqual({
      players: ['Test Player One']
    });
  });

  it('should return new state for REMOVE_PLAYER action', () => {
    expect(bowlingReducer(updatedState, {
      type: REMOVE_PLAYER,
      playerIndex: 1
    })).toEqual({
      players: ['Test Player One']
    });
  });

  it('should return new state for REMOVE_ALL_PLAYERS action', () => {
    expect(bowlingReducer(updatedState, {
      type: REMOVE_ALL_PLAYERS
    })).toEqual({
      players: []
    });
  });
});
