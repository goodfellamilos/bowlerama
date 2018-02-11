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
import { PAPER_STYLE, LIST_STYLE, TABLE_CELL_HIGHLIGHTED_STYLE } from '../constants/materialUIStyles';
import uniqid from 'uniqid';
import { MAX_NUMBER_OF_FRAMES, MAX_NUMBER_OF_PINS } from '../constants/game';
import { generateArrFromN } from '../helpers/utils';

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
    let playerName = players[0].name;
    let playerId = players[0].id;

    if (players[0].scores.length) {
      frame = players[0].scores.length;
    }

    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Player</TableHeaderColumn>
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
            <TableHeaderColumn>Score</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            players.map(player => (
              <TableRow key={`tableRow_${player.id}`}>
                <TableRowColumn>{player.name}</TableRowColumn>
                {
                  headerFramesArr.map(frameIndex => (
                    <TableHeaderColumn key={`tableBodyHeaderColumn_${frameIndex}`}>
                      {this.renderPlayerScore(player.scores, frameIndex)}
                    </TableHeaderColumn>
                  ))
                }
                <TableRowColumn>{this.renderPlayerTotalScore(player.scores)}</TableRowColumn>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    );
  }

  renderPlayerScore(scores, frame) {
    if (scores.length) {
      return scores[frame] && scores[frame].join(' ');
    }

    return ' ';
  }

  renderPlayerTotalScore(scores) {
    if (scores && scores.length) {
      return scores.filter(score => score.length === 3).map(score => score[2]).reduce((sum, val) => sum + val, 0);
    }

    return ' ';
  }

  renderBowlingActions() {
    const { players } = this.props;
    let frame = 1;
    let playerName = players[0].name;
    let playerId = players[0].id;

    if (players.length) {
      const test = players.reduce((scores, player) => {
        scores.push(player.scores);
        return scores;
      }, []);
    }

    if (players[0].scores.length) {
      frame = players[0].scores.length;
    }

    return (
      <div className="bowling__game-form">
        <div className="bowling__game-form__player mt-10">
          Player Name: {playerName}
        </div>
        <div className="bowling__game-form__pins mt-10">
          {this.renderPinButtons(playerId)}
        </div>
      </div>
    );
  }

  renderPinButtons(playerId) {
    const pinButtonsArr = generateArrFromN(MAX_NUMBER_OF_PINS + 1);

    return pinButtonsArr.map(item => (
      <PinButton key={`pinButton_${item}`} playerId={playerId} numberOfPins={item} onClick={this.onPinClick} />
    ));
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
          - A game consists of 10 frames. <br />
          - In general each frame has 2 rolls. <br />
          - In general a player scores the number of pins knocked down. <br />
          - If the player knocks down all 10 pins on the first roll it’s a strike. The player scores 10 plus the number of pins knocked down in the next two rolls. <br />
          - If the player knocks down all 10 pins in two rolls it’s a spare. The player scores 10 plus the number of pins knocked down in the next roll.
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
