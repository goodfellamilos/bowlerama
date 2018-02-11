import React from 'react';
import RandomPinsButton from './RandomPinsButton';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

describe('RandomPinsButton component', () => {
  it('renders without crashing component RandomPinsButton', () => {
    shallow(
      <RandomPinsButton
          playerId={'_playerNumberOne_'}
          numberOfPins={0}
          onClick={e => e} />
    );
  });

  it('renders button', () => {
    expect(mount(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <RandomPinsButton
            playerId={'_playerNumberTwo_'}
            numberOfPins={5}
            onClick={e => e} />
      </MuiThemeProvider>
    ).find('button').length).toBe(1);
  });

  it('creates a snapshot of a component RandomPinsButton', () => {
    const component = renderer.create(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <RandomPinsButton
            playerId={'_playerNumberThree_'}
            numberOfPins={9}
            onClick={e => e} />
      </MuiThemeProvider>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
