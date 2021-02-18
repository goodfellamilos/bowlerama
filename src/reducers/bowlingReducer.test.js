import bowlingReducer from "./bowlingReducer";
import { ACTION_TYPES } from "../actions/bowlingActions";

const { ADD_PLAYER, REMOVE_PLAYER, REMOVE_ALL_PLAYERS, ROLL } = ACTION_TYPES;

const initialState = {
  players: [],
};

const updatedState = {
  players: [
    {
      name: "Player Number One",
      id: "_playerNumberOne_",
      scores: [],
    },
    {
      name: "Player Number Two",
      id: "_playerNumberTwo_",
      scores: [],
    },
  ],
};

describe("bowlingReducer", () => {
  it("should return the initial state", () => {
    expect(bowlingReducer(initialState, {})).toEqual(initialState);
  });

  it("should return new state for ADD_PLAYER action", () => {
    expect(
      bowlingReducer(initialState, {
        type: ADD_PLAYER,
        playerName: "Player Number One",
        playerId: "_playerNumberOne_",
      })
    ).toEqual({
      players: [
        {
          name: "Player Number One",
          id: "_playerNumberOne_",
          scores: [],
        },
      ],
    });
  });

  it("should return new state for REMOVE_PLAYER action", () => {
    expect(
      bowlingReducer(updatedState, {
        type: REMOVE_PLAYER,
        playerId: "_playerNumberTwo_",
      })
    ).toEqual({
      players: [
        {
          name: "Player Number One",
          id: "_playerNumberOne_",
          scores: [],
        },
      ],
    });
  });

  it("should return new state for REMOVE_ALL_PLAYERS action", () => {
    expect(
      bowlingReducer(updatedState, {
        type: REMOVE_ALL_PLAYERS,
      })
    ).toEqual({
      players: [],
    });
  });

  it("should return new state for ROLL action", () => {
    expect(
      bowlingReducer(updatedState, {
        type: ROLL,
        playerId: "_playerNumberOne_",
        numberOfPins: 3,
      })
    ).toEqual({
      players: [
        {
          name: "Player Number One",
          id: "_playerNumberOne_",
          scores: [[3]],
        },
        {
          name: "Player Number Two",
          id: "_playerNumberTwo_",
          scores: [],
        },
      ],
    });
  });
});
