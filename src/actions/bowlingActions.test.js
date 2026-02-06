import {
  ACTION_TYPES,
  addPlayer,
  removePlayer,
  removeAllPlayers,
  roll,
} from "../actions/bowlingActions";

const { ADD_PLAYER, REMOVE_PLAYER, REMOVE_ALL_PLAYERS, ROLL } = ACTION_TYPES;

describe("bowlingActions", () => {
  it("should create an action addPlayer", () => {
    const expectedAction = {
      type: ADD_PLAYER,
      playerName: "Player Number One",
      playerId: "_playerNumberOne_",
    };
    expect(addPlayer("Player Number One", "_playerNumberOne_")).toEqual(
      expectedAction,
    );
  });

  it("should create an action removePlayer", () => {
    const expectedAction = {
      type: REMOVE_PLAYER,
      playerId: "_playerNumberOne_",
    };
    expect(removePlayer("_playerNumberOne_")).toEqual(expectedAction);
  });

  it("should create an action removeAllPlayers", () => {
    const expectedAction = {
      type: REMOVE_ALL_PLAYERS,
    };
    expect(removeAllPlayers()).toEqual(expectedAction);
  });

  it("should create an action roll", () => {
    const expectedAction = {
      type: ROLL,
      playerId: "_playerNumberOne_",
      numberOfPins: 6,
    };
    expect(roll("_playerNumberOne_", 6)).toEqual(expectedAction);
  });
});
