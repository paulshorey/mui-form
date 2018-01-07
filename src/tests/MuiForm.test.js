import $ from 'jquery'; 
import 'window/theme';

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import MuiForm from './../exports/MuiForm';
import MuiInput from './../exports/MuiInput';
import validations from './../exports/validations';


/*
    render it
*/
class TestComponent extends React.Component {
    constructor(){
        super();
        this.state = {};
        // for testing, let's remember this component
        window.ThisComponent = this;
    }
    render() {
        return (
            <MuiForm stateScope={this} onSubmit={()=>{
                console.log('submitting...');
            }}>
                <MuiInput name="firstInputProperty" stateScope={this} />
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
it('renders a <form class="MuiForm"> element', () => {
    const MuiForm = document.querySelector('form.MuiForm'); // specific selector will get this job done
    expect(!!MuiForm).toBe(true); // simply check that the selector found something
});



/*
    check that it works
*/
it('contains a submit button', () => {
    const MuiSubmit = document.querySelector('button[type="submit"]');
    expect(!!MuiSubmit).toBe(true);
});