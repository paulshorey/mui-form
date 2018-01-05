import $ from 'jquery'; 
import 'window/theme';

import React from 'react';
import renderer from 'react-test-renderer';

import MuiToggle from './MuiToggle';
import MuiForm from './MuiForm';

it('renders correctly', () => {

    class Result extends React.Component {
        state = {};
		render() {
			return (
                <MuiForm stateScope={this}>
				    <MuiToggle name="propertyName" stateScope={this} />
                </MuiForm>
			);
		}
    }
    const tree = renderer.create(<Result />).toJSON();
    
	expect(tree).toMatchSnapshot();
});
