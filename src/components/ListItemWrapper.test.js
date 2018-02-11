import React from 'react';
import ListItemWrapper from './ListItemWrapper';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

// Some of material ui components has to be mocked in order to create component snapshots
jest.mock('material-ui/IconButton', () => 'IconButton');

describe('ListItemWrapper component', () => {
  it('renders without crashing component ListItemWrapper', () => {
    shallow(
      <ListItemWrapper
          player={{
            name: 'Player Number One',
            id: '_playerNumberOne_',
            scores: []
          }}
          onClick={e => e} />
    );
  });

  it('renders without crashing component ListItemWrapper', () => {
    const component = renderer.create(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <ListItemWrapper
            player={{
              name: 'Player Number One',
              id: '_playerNumberOne_',
              scores: []
            }}
            onClick={e => e} />
      </MuiThemeProvider>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
