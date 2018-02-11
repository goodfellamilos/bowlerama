import React from 'react';
import DeleteButton from './DeleteButton';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('DeleteButton component', () => {
  it('renders without crashing component DeleteButton', () => {
    shallow(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <DeleteButton onClick={e => e}/>
      </MuiThemeProvider>
    );
  });

  it('renders button', () => {
    expect(mount(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <DeleteButton onClick={e => e}/>
      </MuiThemeProvider>
    ).find('button').length).toBe(1);
  });
});
