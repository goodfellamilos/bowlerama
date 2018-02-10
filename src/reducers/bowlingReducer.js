import { ACTION_TYPES } from '../actions/bowlingActions';

const initialState = {
  players: []
};

export default function friends(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, action.playerName],
      };
    case ACTION_TYPES.REMOVE_PLAYER:
      return {
        ...state,
        players: state.players.filter((item, index) => index !== action.playerIndex),
      };
    case ACTION_TYPES.REMOVE_ALL_PLAYERS:
      return {
        ...state,
        players: [],
      };
    default:
      return state;
  }
}
