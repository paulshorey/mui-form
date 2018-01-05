import $ from 'jquery'; 
import 'window/theme';

import React from 'react';
import renderer from 'react-test-renderer';

import MuiSelect from './MuiSelect';
import MuiForm from './MuiForm';

it('renders correctly', () => {

    class Result extends React.Component {
        state = {};
		render() {
			return (
                <MuiForm stateScope={this}>
				    <MuiSelect name="propertyName" stateScope={this}>
                        <option value="">only need one option for test</option>
                    </MuiSelect>
                </MuiForm>
			);
		}
    }
    const tree = renderer.create(<Result />).toJSON();
    
	expect(tree).toMatchSnapshot();
});
