import React from 'react';
import DeleteButton from './DeleteButton';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

it('renders without crashing component DeleteButton', () => {
  shallow(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <DeleteButton />
    </MuiThemeProvider>
  );
});