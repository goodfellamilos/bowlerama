import React from 'react';
import PinButton from './PinButton';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

describe('PinButton component', () => {
  it('renders without crashing component PinButton', () => {
    shallow(
      <PinButton
          playerId={'_playerNumberOne_'}
          numberOfPins={4}
          onClick={e => e} />
    );
  });

  it('renders button', () => {
    expect(mount(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <PinButton
            playerId={'_playerNumberOne_'}
            numberOfPins={4}
            onClick={e => e} />
      </MuiThemeProvider>
    ).find('button').length).toBe(1);
  });

  it('renders button disabled false', () => {
    expect(mount(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <PinButton
            playerId={'_playerNumberOne_'}
            numberOfPins={4}
            onClick={e => e} />
      </MuiThemeProvider>
    ).find('button').prop('disabled')).toEqual(false);
  });

  it('renders button disabled true', () => {
    expect(mount(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <PinButton
            playerId={'_playerNumberOne_'}
            numberOfPins={4}
            disabled={true}
            onClick={e => e} />
      </MuiThemeProvider>
    ).find('button').prop('disabled')).toEqual(true);
  });
});
