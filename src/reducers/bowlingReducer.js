import { ACTION_TYPES } from '../actions/bowlingActions';

const initialState = {
  players: []
};

export default function friends(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, {
          name: action.playerName,
          id: action.playerId,
          scores: []
        }]
      };
    case ACTION_TYPES.REMOVE_PLAYER:
      return {
        ...state,
        players: state.players.filter(player => player.id !== action.playerId)
      };
    case ACTION_TYPES.REMOVE_ALL_PLAYERS:
      return {
        ...state,
        players: [],
      };
    case ACTION_TYPES.ROLL:
      const { players } = state;
      const { playerId, numberOfPins } = action;
      const currentPlayer = players.find(player => player.id === playerId);
      const currentPlayerScores = currentPlayer.scores;

      if (currentPlayerScores.length && currentPlayerScores[currentPlayerScores.length - 1].length === 1) {
        currentPlayerScores[currentPlayerScores.length - 1].push(numberOfPins);
      } else {
        currentPlayerScores.push([numberOfPins]);
      }

      return {
        ...state,
        players: players
      };
    default:
      return state;
  }
}
