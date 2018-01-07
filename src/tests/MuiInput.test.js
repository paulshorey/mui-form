import $ from 'jquery'; 
import 'window/theme';

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import MuiInput from './../exports/MuiInput';
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
                <MuiInput name="propertyName" stateScope={this} validations={[validations.required]} />
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
it('renders a <input type="text"> element inside a ".MuiInput" div', () => {
    const MuiInputDiv = document.querySelector('.MuiInput');
    expect(MuiInputDiv.querySelector('input').type).toBe("text");
});



/*
    check that it works
*/
it('performs validation', () => {
    
    // user action
	document.querySelector('input').focus();
    document.querySelector('input').blur();
    // test that it is off and thus "invalid"
    expect(document.querySelector('.MuiInput').classList.contains('invalid')).toBe(true);
    
});