import $ from 'jquery'; 
import 'window/theme';

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import MuiSelect from './../exports/MuiSelect';
import MuiForm from './../exports/MuiForm';
import validations from './../exports/validations';


/*
    render it
*/
class TestComponent extends React.Component {
    state = {};
    render() {
        return (
            <MuiForm stateScope={this}>
                <MuiSelect name="propertyName" stateScope={this} validations={[validations.required]}>
                    <option value="">only need one option for test</option>
                </MuiSelect>
            </MuiForm>
        );
    }
}
const rootDiv = document.createElement('b');
rootDiv.setAttribute("id", "root");
document.body.appendChild(rootDiv);
ReactDOM.render(<TestComponent />,rootDiv);



/*
    check that it is rendered
*/
it('renders a <select> element inside a ".MuiSelect" div, with one child <option> element', () => {
	
    const MuiSelectDiv = document.querySelector('.MuiSelect');
    expect(MuiSelectDiv.querySelector('select').length).toBe(1);

});



/*
    check that it works
*/
it('performs validation', () => {
	
	document.querySelector('select').focus();
    document.querySelector('select').blur();
    expect(document.querySelector('.MuiSelect').classList.contains('invalid')).toBe(true);
    
});