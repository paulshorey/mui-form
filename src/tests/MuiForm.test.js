/*
    needs many more tests, but this is the idea
    * able to manipulate field values, which cause a state change on the parent component
    * so, based on the component's state, the form is allowed to submit, or it is not.
*/
import React from 'react';
import { MuiForm, MuiInput, MuiSelect, MuiToggle, validations } from './../index';
// for testing
import * as enzyme from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });


/*
    render it
*/
const spyFormSubmit = jest.fn();
class TestComponent extends React.Component {
    constructor(){
        super();
        this.state = {};
        // for testing, let's remember this component
        window.ThisComponent = this;
    }
    render() {
        return (
            <MuiForm stateScope={this} onSubmit={spyFormSubmit}>
                <MuiInput name="someText" stateScope={this} validations={[validations.email]} />
                <MuiSelect name="someSelector" stateScope={this}>
                    <option value="">only need one option for test</option>
                </MuiSelect>
                <MuiToggle name="someToggle" value="it's actually a checkbox!" stateScope={this} />
            </MuiForm>
        );
    }
}



/*
    check that it is rendered
*/
it('renders a <form class="MuiForm"> element', () => {
    const enzymeComponent = enzyme.mount(<TestComponent />);
    expect(!!enzymeComponent.find('form.MuiForm').instance()).toBe(true);
});
it('renders a <form class="MuiForm"> element', () => {
    const enzymeComponent = enzyme.mount(<TestComponent />);
    expect(!!enzymeComponent.find('form button[type="submit"]').instance()).toBe(true);
});


/*
    check that it works
*/
it('does NOT submit if nothing changed', () => {

    const enzymeComponent = enzyme.mount(<TestComponent />);
    enzymeComponent.find('button[type="submit"]').instance().click();
    expect(spyFormSubmit).not.toHaveBeenCalled();
    
});
it('does NOT submit if an <input /> changed and invalid', () => {

    const enzymeComponent = enzyme.mount(<TestComponent />);
    enzymeComponent.find('input[type="text"]').simulate('focus');
    enzymeComponent.find('input[type="text"]').instance().value = 'notValidEmail';
    enzymeComponent.find('input[type="text"]').simulate('change');
    enzymeComponent.find('input[type="text"]').simulate('blur');
    enzymeComponent.find('button[type="submit"]').instance().click();
    expect(spyFormSubmit).not.toHaveBeenCalled();
    
});
it('does submit if an <input /> changed and valid', () => {

    const enzymeComponent = enzyme.mount(<TestComponent />);
    enzymeComponent.find('form').simulate('change');
    enzymeComponent.find('input[type="text"]').simulate('focus');
    enzymeComponent.find('input[type="text"]').instance().value = 'me@myself.com';
    enzymeComponent.find('input[type="text"]').simulate('change');
    enzymeComponent.find('input[type="text"]').simulate('blur');
    enzymeComponent.find('button[type="submit"]').instance().click();
    // console.log(enzymeComponent.find('button[type="submit"]').instance().outerHTML);
    // console.log(enzymeComponent.find('.MuiInput').instance().outerHTML);
    // console.log(enzymeComponent.find('form').instance().outerHTML);
    // console.log(enzymeComponent.state());
    expect(spyFormSubmit).toHaveBeenCalledTimes(1);
    
});

