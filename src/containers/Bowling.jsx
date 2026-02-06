/* eslint-disable react/prop-types */
import { Component } from "react";
import { connect } from "react-redux";
import {
  Paper,
  TextField,
  Button,
  List,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  addPlayer,
  removePlayer,
  removeAllPlayers,
  roll,
} from "../actions/bowlingActions";
import ListItemWrapper from "../components/ListItemWrapper";
import PinButton from "../components/PinButton";
import RandomPinsButton from "../components/RandomPinsButton";
import {
  PAPER_STYLE,
  LIST_STYLE,
  TABLE_CELL_HIGHLIGHTED_STYLE,
  TABLE_FIRST_COLUMN_CELL_STYLE,
} from "../constants/materialUIStyles";
import uniqid from "uniqid";
import {
  GAME_RULES,
  MAX_NUMBER_OF_FRAMES,
  MAX_NUMBER_OF_PINS,
} from "../constants/game";
import { generateArrFromN, getRandomInt } from "../helpers/utils";
import {
  getActivePlayer,
  calculateRemainingPins,
  calculatePlayerTotalScore,
} from "../helpers/game";

class Bowling extends Component {
  constructor() {
    super();
    this.state = {
      playerName: "",
      playerNameErrorText: "",
      gameStarted: false,
      dialogOpen: false,
    };
  }

  render() {
    return (
      <div className="bowling-container">
        <div className="height-100">
          <Paper style={PAPER_STYLE}>
            {this.renderStartForm()}
            {this.renderGameForm()}
          </Paper>
          <div className="bowling__bottom-actions mt-20">
            <Button
              variant="contained"
              color="secondary"
              onClick={this.onRestartGameClick}
            >
              {"Restart Game"}
            </Button>
            {this.renderGameRulesDialog()}
          </div>
        </div>
      </div>
    );
  }

  renderStartForm() {
    const { gameStarted, playerName, playerNameErrorText } = this.state;

    if (!gameStarted) {
      return (
        <div className="bowling">
          <div className="bowling__add-players width-50">
            <div className="bowling__add-players__form">
              <div>
                <TextField
                  placeholder="Player Name"
                  variant="standard"
                  value={playerName}
                  onChange={this.onParticipantNameChange}
                  error={!!playerNameErrorText}
                  helperText={playerNameErrorText}
                />
              </div>
              <div className="mt-10">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onAddPlayerClick}
                >
                  {"Add Player"}
                </Button>
              </div>
              {this.renderStartGameButton()}
            </div>
          </div>
          <div className="bowling__players-list width-50">
            <h3 className="bowling__players-list__heading">
              {"List of Players"}
            </h3>
            {this.renderPlayersList()}
          </div>
        </div>
      );
    }

    return null;
  }

  renderStartGameButton() {
    const { players } = this.props;

    if (players.length) {
      return (
        <div className="mt-40">
          <Button
            variant="contained"
            color="secondary"
            onClick={this.onStartGame}
          >
            {"Start Game"}
          </Button>
        </div>
      );
    }

    return null;
  }

  renderPlayersList() {
    const { players } = this.props;

    if (players.length) {
      return (
        <List style={LIST_STYLE}>
          {players.map((player) => (
            <ListItemWrapper
              key={`listItemWrapper_${player.id}`}
              player={player}
              onClick={this.onRemovePlayerClick}
            />
          ))}
        </List>
      );
    }

    return null;
  }

  renderGameForm() {
    const { gameStarted } = this.state;

    if (gameStarted) {
      return (
        <div>
          {this.renderPlayersTable()}
          {this.renderBowlingActions()}
        </div>
      );
    }

    return null;
  }

  renderPlayersTable() {
    const { players } = this.props;
    const headerFramesArr = generateArrFromN(MAX_NUMBER_OF_FRAMES);
    const frame = players[0].scores.length || 1;

    let activePlayer = players[0];

    if (players.length > 1) {
      activePlayer = getActivePlayer(players, activePlayer);
    }

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={TABLE_FIRST_COLUMN_CELL_STYLE}>
                {"Player"}
              </TableCell>
              {headerFramesArr.map((frameIndex) => {
                const tableHeaderColumnStyle =
                  frameIndex + 1 === frame ? TABLE_CELL_HIGHLIGHTED_STYLE : {};
                return (
                  <TableCell
                    key={`tableHeaderHeaderColumn_${frameIndex}`}
                    style={tableHeaderColumnStyle}
                  >
                    {`F ${frameIndex + 1}`}
                  </TableCell>
                );
              })}
              <TableCell>{"Score"}</TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <div className="table-container">
          <Table>
            <TableBody>
              {players.map((player) => {
                const tableRowColumnStyle =
                  activePlayer.id === player.id
                    ? TABLE_CELL_HIGHLIGHTED_STYLE
                    : {};
                return (
                  <TableRow key={`tableRow_${player.id}`}>
                    <TableCell
                      style={{
                        ...TABLE_FIRST_COLUMN_CELL_STYLE,
                        ...tableRowColumnStyle,
                      }}
                    >
                      {player.name}
                    </TableCell>
                    {headerFramesArr.map((frameIndex) => (
                      <TableCell key={`tableBodyHeaderColumn_${frameIndex}`}>
                        {this.renderPlayerScore(player.scores, frameIndex)}
                      </TableCell>
                    ))}
                    <TableCell>
                      {this.renderPlayerTotalScore(player.scores)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  renderPlayerScore(scores, frame) {
    if (scores.length) {
      const frameScore = scores[frame];

      return (
        <div className="text-center">
          {frameScore && frameScore.slice(0, 2).join(" ")}
          {frameScore && frameScore[2] ? (
            <div className="bold">{frameScore[2]}</div>
          ) : null}
        </div>
      );
    }

    return null;
  }

  renderPlayerTotalScore(scores) {
    if (scores && scores.length) {
      return calculatePlayerTotalScore(scores);
    }

    return null;
  }

  renderBowlingActions() {
    const { players } = this.props;

    const isGameEnded = players.every(
      (player) =>
        player.scores.length === MAX_NUMBER_OF_FRAMES &&
        player.scores[MAX_NUMBER_OF_FRAMES - 1].length === 3,
    );

    if (isGameEnded) {
      const totalScores = players.map((player) =>
        calculatePlayerTotalScore(player.scores),
      );
      const maxTotalScore = Math.max(...totalScores);
      const winners = players
        .filter(
          (player) =>
            calculatePlayerTotalScore(player.scores) === maxTotalScore,
        )
        .map((player) => player.name);
      const winnersLabel = winners.length > 1 ? "Winners are: " : "Winner is: ";

      return (
        <div className="bowling__game-over">
          <div>
            <div className="inline-block mr-20">{winnersLabel}</div>
            <div className="bowling__game-over__winner inline-block">
              {winners.join(", ")}
            </div>
          </div>
        </div>
      );
    }

    let activePlayer = players[0];

    if (players.length > 1) {
      activePlayer = getActivePlayer(players, activePlayer);
    }

    const remainingPins = calculateRemainingPins(activePlayer.scores);

    return (
      <div className="bowling__game-form">
        <div className="bowling__game-form__pins mt-10">
          {this.renderPinButtons(activePlayer.id, remainingPins)}
        </div>
        <div className="text-center mt-20">
          {this.renderRandomPinsButton(activePlayer.id, remainingPins)}
        </div>
      </div>
    );
  }

  renderPinButtons(playerId, remainingPins) {
    const pinButtonsArr = generateArrFromN(MAX_NUMBER_OF_PINS + 1);

    return pinButtonsArr.map((item) => {
      const buttonDisabled = item > remainingPins;

      return (
        <PinButton
          key={`pinButton_${item}`}
          playerId={playerId}
          numberOfPins={item}
          disabled={buttonDisabled}
          onClick={this.onPinClick}
        />
      );
    });
  }

  renderRandomPinsButton(playerId, remainingPinsValue) {
    const numberOfPins = getRandomInt(0, remainingPinsValue);

    return (
      <RandomPinsButton
        playerId={playerId}
        numberOfPins={numberOfPins}
        onClick={this.onPinClick}
      />
    );
  }

  renderGameRulesDialog() {
    return (
      <div className="text-right">
        <Button variant="contained" onClick={this.onOpenDialogClick}>
          {"Game Rules"}
        </Button>
        <Dialog open={this.state.dialogOpen} onClose={this.onCloseDialogClick}>
          <DialogTitle>{"Game Rules"}</DialogTitle>
          <DialogContent>
            {GAME_RULES.map((rule, index) => (
              <div key={`rule_${index}`}>{rule}</div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.onCloseDialogClick}>
              {"Close"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  onParticipantNameChange = (e) => {
    this.setState({
      playerName: e.target.value,
    });
  };

  onAddPlayerClick = () => {
    const { playerName } = this.state;

    if (!playerName) {
      this.setState({
        playerNameErrorText: "Player Name can not be empty",
      });

      return;
    }

    const playerId = uniqid();

    this.props.addPlayer(playerName, playerId);
    this.setState({
      playerName: "",
      playerNameErrorText: "",
    });
  };

  onRemovePlayerClick = (playerId) => {
    this.props.removePlayer(playerId);
  };

  onStartGame = () => {
    this.setState({
      gameStarted: true,
    });
  };

  onOpenDialogClick = () => {
    this.setState({
      dialogOpen: true,
    });
  };

  onCloseDialogClick = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  onRestartGameClick = () => {
    this.setState({
      playerName: "",
      playerNameErrorText: "",
      gameStarted: false,
    });

    this.props.removeAllPlayers();
  };

  onPinClick = (playerId, numberOfPins) => {
    this.props.roll(playerId, numberOfPins);
  };
}

function mapStateToProps(state) {
  const { players } = state.bowling;

  return {
    players,
  };
}

export default connect(mapStateToProps, {
  addPlayer,
  removePlayer,
  removeAllPlayers,
  roll,
})(Bowling);
