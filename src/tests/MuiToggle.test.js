import $ from 'jquery'; 
import 'window/theme';

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import MuiToggle from './../exports/MuiToggle';
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
                <MuiToggle name="propertyName" stateScope={this} validations={[validations.required]} />
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
it('renders a <input type="checkbox"> element inside a ".MuiToggle" div', () => {
    const MuiToggleDiv = document.querySelector('.MuiToggle');
    expect(MuiToggleDiv.querySelector('input[type="checkbox"]').type).toBe("checkbox");
});



/*
    check that it works
*/
it('performs validation', () => {
    
    // toggle on
	document.querySelector('input[type="checkbox"]').focus();
	document.querySelector('input[type="checkbox"]').click();
    document.querySelector('input[type="checkbox"]').blur();
    // toggle off
	document.querySelector('input[type="checkbox"]').focus();
	document.querySelector('input[type="checkbox"]').click();
    document.querySelector('input[type="checkbox"]').blur();
    // test that it is off and thus "invalid"
    expect(document.querySelector('.MuiToggle').classList.contains('invalid')).toBe(true);
    
});