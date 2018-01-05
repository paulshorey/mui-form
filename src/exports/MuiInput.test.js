import $ from 'jquery'; 
import 'window/theme';

import React from 'react';
import renderer from 'react-test-renderer';

import MuiInput from './MuiInput';
import MuiForm from './MuiForm';

it('renders correctly', () => {

    class Result extends React.Component {
        state = {};
		render() {
			return (
                <MuiForm stateScope={this}>
				    <MuiInput name="propertyName" stateScope={this} />
                </MuiForm>
			);
		}
    }
    const tree = renderer.create(<Result />).toJSON();
    
	expect(tree).toMatchSnapshot();
});
