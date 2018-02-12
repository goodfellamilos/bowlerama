import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Paper,
  TextField,
  RaisedButton,
  FlatButton,
  List,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  Dialog
} from 'material-ui';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import {
  addPlayer,
  removePlayer,
  removeAllPlayers,
  roll
} from '../actions/bowlingActions';
import ListItemWrapper from '../components/ListItemWrapper';
import PinButton from '../components/PinButton';
import RandomPinsButton from '../components/RandomPinsButton';
import {
  PAPER_STYLE,
  LIST_STYLE,
  TABLE_CELL_HIGHLIGHTED_STYLE,
  TABLE_FIRST_COLUMN_CELL_STYLE
} from '../constants/materialUIStyles';
import uniqid from 'uniqid';
import { GAME_RULES, MAX_NUMBER_OF_FRAMES, MAX_NUMBER_OF_PINS } from '../constants/game';
import { generateArrFromN, getRandomInt } from '../helpers/utils';

// Get active player when current active player finished with rolling
const getActivePlayer = (players, currentActivePlayer) => {
  const maxScoresLength = Math.max.apply(Math, players.map(player => player.scores.length));
  let activePlayer = currentActivePlayer;

  if (maxScoresLength > 0) {
    const playersWithMaxScoresLength = players.filter(player => player.scores.length === maxScoresLength);
    const lastPlayerWithMaxScores = playersWithMaxScoresLength[playersWithMaxScoresLength.length - 1];
    const scoresOfLastPlayerWithMaxScores = lastPlayerWithMaxScores.scores;
    const lastScoreOfLastPlayerWithMaxScores = scoresOfLastPlayerWithMaxScores[scoresOfLastPlayerWithMaxScores.length - 1];

    activePlayer = lastPlayerWithMaxScores;

    if (lastScoreOfLastPlayerWithMaxScores.length === 3) {
      const activePlayerIndex = players.findIndex(player => player.id === activePlayer.id);

      if (activePlayerIndex === players.length - 1) {
        activePlayer = players[0];
      } else {
        activePlayer = players[activePlayerIndex + 1];
      }
    }
  }

  return activePlayer
};

class Bowling extends Component {
  constructor() {
    super();
    this.state = {
      playerName: '',
      playerNameErrorText: '',
      gameStarted: false,
      dialogOpen: false
    }
  }

  render() {
    return (
      <div className="bowling-container">
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div className="height-100">
            <Paper style={PAPER_STYLE}>
              {this.renderStartForm()}
              {this.renderGameForm()}
            </Paper>
            <div className="bowling__bottom-actions mt-20">
              <RaisedButton secondary={true} label={'Restart Game'} onClick={this.onRestartGameClick} />
              {this.renderGameRulesDialog()}
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }

  renderStartForm() {
    const {
      gameStarted,
      playerName,
      playerNameErrorText
    } = this.state;

    if (!gameStarted) {
      return (
        <div className="bowling">
          <div className="bowling__add-players width-50">
            <div className="bowling__add-players__form">
              <div>
                <TextField
                    hintText={'Player Name'}
                    value={playerName}
                    onChange={this.onParticipantNameChange}
                    errorText={playerNameErrorText} />
              </div>
              <div className="mt-10">
                <RaisedButton
                    label={'Add Player'}
                    primary={true}
                    onClick={this.onAddPlayerClick} />
              </div>
              {this.renderStartGameButton()}
            </div>
          </div>
          <div className="bowling__players-list width-50">
            <h3 className="bowling__players-list__heading">{'List of Players'}</h3>
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
          <RaisedButton
              label={'Start Game'}
              secondary={true}
              onClick={this.onStartGame} />
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
          {
            players.map(player => (
              <ListItemWrapper key={`listItemWrapper_${player.id}`} player={player} onClick={this.onRemovePlayerClick} />
            ))
          }
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
      )
    }

    return null;
  }

  renderPlayersTable() {
    const { players } = this.props;
    const headerFramesArr = generateArrFromN(MAX_NUMBER_OF_FRAMES);
    let frame = 1;

    if (players[0].scores.length) {
      frame = players[0].scores.length;
    }

    let activePlayer = players[0];

    if (players.length > 1) {
      activePlayer = getActivePlayer(players, activePlayer);
    }

    return (
      <div>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} fixedHeader={true}>
            <TableRow>
              <TableHeaderColumn style={TABLE_FIRST_COLUMN_CELL_STYLE}>{'Player'}</TableHeaderColumn>
              {
                headerFramesArr.map(frameIndex => {
                  const tableHeaderColumnStyle = frameIndex + 1 === frame ? TABLE_CELL_HIGHLIGHTED_STYLE : {};
                  return (
                    <TableHeaderColumn
                        key={`tableHeaderHeaderColumn_${frameIndex}`}
                        style={tableHeaderColumnStyle}>
                      {`F ${frameIndex + 1}`}
                    </TableHeaderColumn>
                  )
                })
              }
              <TableHeaderColumn>{'Score'}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
        </Table>
        <div className="table-container">
          <Table>
            <TableBody displayRowCheckbox={false}>
              {
                players.map(player => {
                  const tableRowColumnStyle = activePlayer.id === player.id ? TABLE_CELL_HIGHLIGHTED_STYLE : {};
                  return (
                    <TableRow key={`tableRow_${player.id}`}>
                      <TableRowColumn style={{...TABLE_FIRST_COLUMN_CELL_STYLE, ...tableRowColumnStyle}}>
                        {player.name}
                      </TableRowColumn>
                      {
                        headerFramesArr.map(frameIndex => (
                          <TableHeaderColumn key={`tableBodyHeaderColumn_${frameIndex}`}>
                            {this.renderPlayerScore(player.scores, frameIndex)}
                          </TableHeaderColumn>
                        ))
                      }
                      <TableRowColumn>{this.renderPlayerTotalScore(player.scores)}</TableRowColumn>
                    </TableRow>
                  )
                })
              }
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
          {frameScore && frameScore.slice(0, 2).join(' ')}
          {frameScore && frameScore[2] ? <div className="bold">{frameScore[2]}</div> : null}
        </div>
      );
    }

    return null;
  }

  renderPlayerTotalScore(scores) {
    if (scores && scores.length) {
      return scores.filter(score => score.length === 3).map(score => score[2]).reduce((sum, val) => sum + val, 0);
    }

    return null;
  }

  renderBowlingActions() {
    const { players } = this.props;
    let activePlayer = players[0];

    if (players.length > 1) {
      activePlayer = getActivePlayer(players, activePlayer);
    }

    // Disable Pin numbers after first roll, if first roll value larger than 0
    // (subtract number of pins knocked down from max number of pins - 10)
    const activePlayerScores = activePlayer.scores;
    const activePlayerActiveScore = activePlayerScores[activePlayerScores.length - 1];

    let remainingPinsValue = MAX_NUMBER_OF_PINS;

    if (activePlayerActiveScore && activePlayerActiveScore.length === 1) {
      remainingPinsValue -= activePlayerActiveScore[0];
    }

    return (
      <div className="bowling__game-form">
        <div className="bowling__game-form__pins mt-10">
          {this.renderPinButtons(activePlayer.id, remainingPinsValue)}
        </div>
        <div className="text-center mt-20">
          {this.renderRandomPinsButton(activePlayer.id, remainingPinsValue)}
        </div>
      </div>
    );
  }

  renderPinButtons(playerId, remainingPinsValue) {
    const pinButtonsArr = generateArrFromN(MAX_NUMBER_OF_PINS + 1);

    return pinButtonsArr.map(item => {
      const buttonDisabled = item > remainingPinsValue;

      return (
        <PinButton
            key={`pinButton_${item}`}
            playerId={playerId}
            numberOfPins={item}
            disabled={buttonDisabled}
            onClick={this.onPinClick} />
      )
    });
  }

  renderRandomPinsButton(playerId, remainingPinsValue) {
    const numberOfPins = getRandomInt(0, remainingPinsValue);

    return (
      <RandomPinsButton
          playerId={playerId}
          numberOfPins={numberOfPins}
          onClick={this.onPinClick} />
    )
  }

  renderGameRulesDialog() {
    const dialogActions = [
      <FlatButton
          label={'Close'}
          primary={true}
          onClick={this.onCloseDialogClick} />
    ];

    return (
      <div className="text-right">
        <RaisedButton label={'Game Rules'} onClick={this.onOpenDialogClick} />
        <Dialog
            title={'Game Rules'}
            modal={false}
            actions={dialogActions}
            open={this.state.dialogOpen}
            onRequestClose={this.onCloseDialogClick}>
          {GAME_RULES.map((rule, index) => <div key={`rule_${index}`}>{rule}</div>)}
        </Dialog>
      </div>
    )
  }

  onParticipantNameChange = (e) => {
    this.setState({
      playerName: e.target.value
    });
  };

  onAddPlayerClick = () => {
    const { playerName } = this.state;

    if (!playerName) {
      this.setState({
        playerNameErrorText: 'Player Name can not be empty'
      });

      return;
    }

    const playerId = uniqid();

    this.props.addPlayer(playerName, playerId);
    this.setState({
      playerName: '',
      playerNameErrorText: ''
    });
  };

  onRemovePlayerClick = (playerId) => {
    this.props.removePlayer(playerId);
  };

  onStartGame = () => {
    this.setState({
      gameStarted: true
    });
  };

  onOpenDialogClick = () => {
    this.setState({
      dialogOpen: true
    });
  };

  onCloseDialogClick = () => {
    this.setState({
      dialogOpen: false
    });
  };

  onRestartGameClick = () => {
    this.setState({
      playerName: '',
      playerNameErrorText: '',
      gameStarted: false
    });

    this.props.removeAllPlayers();
  };

  onPinClick = (playerId, numberOfPins) => {
    this.props.roll(playerId, numberOfPins);
  }
}

function mapStateToProps(state) {
  const { players } = state.bowling;

  return {
    players
  };
}

export default connect(mapStateToProps, {
  addPlayer,
  removePlayer,
  removeAllPlayers,
  roll
})(Bowling)
