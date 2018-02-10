import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Paper,
  TextField,
  RaisedButton,
  FlatButton,
  List,
  ListItem,
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
  removeAllPlayers
} from '../actions/bowlingActions';
import DeleteButton from '../components/DeleteButton';
import { PAPER_STYLE, LIST_STYLE, LIST_ITEM_STYLE } from '../constants/materialUIStyles';

const ListItemWrapper = ({player, playerIndex, onClick}) => {
  const onButtonClick = () => {
    onClick(playerIndex);
  };

  return (
    <ListItem
        disableTouchRipple={true}
        style={LIST_ITEM_STYLE}
        primaryText={player}
        rightIconButton={<DeleteButton onClick={onButtonClick} />} />
  );
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
              {this.renderPlayersTable()}
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
    const {gameStarted} = this.state;

    if (!gameStarted) {
      return (
        <div className="bowling">
          <div className="bowling__add-players width-50">
            <div className="bowling__add-players__form">
              <div>
                <TextField
                    hintText="Player Name"
                    value={this.state.playerName}
                    onChange={this.onParticipantNameChange}
                    errorText={this.state.playerNameErrorText} />
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
            <h3 className="bowling__players-list__heading">List of Players</h3>
            {this.renderPlayersList()}
          </div>
        </div>
      );
    }

    return null;
  }

  renderStartGameButton() {
    const {players} = this.props;

    if (players.length > 1) {
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
    const {players} = this.props;

    if (players.length) {
      return (
        <List style={LIST_STYLE}>
          {
            players.map((player, index) => (
              <ListItemWrapper player={player} playerIndex={index} onClick={this.onRemovePlayerClick} />
            ))
          }
        </List>
      );
    }

    return null;
  }

  renderPlayersTable() {
    const {players} = this.props;
    const {gameStarted} = this.state;

    if (gameStarted) {
      return (
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Player Name</TableHeaderColumn>
              <TableHeaderColumn>Round 1</TableHeaderColumn>
              <TableHeaderColumn>Round 2</TableHeaderColumn>
              <TableHeaderColumn>Round 3</TableHeaderColumn>
              <TableHeaderColumn>Round 4</TableHeaderColumn>
              <TableHeaderColumn>Round 5</TableHeaderColumn>
              <TableHeaderColumn>Round 6</TableHeaderColumn>
              <TableHeaderColumn>Round 7</TableHeaderColumn>
              <TableHeaderColumn>Round 8</TableHeaderColumn>
              <TableHeaderColumn>Round 9</TableHeaderColumn>
              <TableHeaderColumn>Round 10</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              players.map(player => (
                <TableRow>
                  <TableRowColumn>{player}</TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      )
    }

    return null;
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
            title="Game Rules"
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
        playerNameErrorText: 'Player name can not be empty'
      });

      return;
    }

    this.props.addPlayer(this.state.playerName);
    this.setState({
      playerName: '',
      playerNameErrorText: ''
    });
  };

  onRemovePlayerClick = (playerIndex) => {
    this.props.removePlayer(playerIndex);
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
})(Bowling)
