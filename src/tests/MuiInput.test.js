// for rendering the component
import React from 'react';
import { MuiInput, MuiForm, validations } from './../index';
// for testing
import * as enzyme from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });



/*
    render it
*/
class TestComponent extends React.Component {
    state = {};
    render() {
        return (
            <MuiForm stateScope={this}>
                <MuiInput name="propertyName" stateScope={this} validations={[validations.email]} />
            </MuiForm>
        );
    }
}
const enzymeComponent = enzyme.mount(<TestComponent />);


/*
    check that it is rendered
*/
it('renders a <input type="text"> element inside a ".MuiInput" div', () => {
    expect(!!enzymeComponent.find('.MuiInput input[type="text"]').instance()).toBe(true);
});



/*
    check that it works
*/
it('validation: fails if not valid', () => {
    // user action
    enzymeComponent.find('input[type="text"]').simulate('focus');
    enzymeComponent.find('input[type="text"]').instance().value = 'asdf';
    enzymeComponent.find('input[type="text"]').simulate('change');
    enzymeComponent.find('input[type="text"]').simulate('blur');
    // test that it has className "invalid"
    expect(enzymeComponent.find('.MuiInput').instance().classList.contains('invalid')).toBe(true);
});
it('validation: ok if valid', () => {
    // user action
    enzymeComponent.find('input[type="text"]').simulate('focus');
    enzymeComponent.find('input[type="text"]').instance().value = 'some@email.com';
    enzymeComponent.find('input[type="text"]').simulate('change');
    enzymeComponent.find('input[type="text"]').simulate('blur');
    // test that has lost that "invalid" className
    expect(enzymeComponent.find('.MuiInput').instance().classList.contains('invalid')).toBe(false); 
});
it('validation: ok if empty', () => {
    // user action
    enzymeComponent.find('input[type="text"]').simulate('focus');
    enzymeComponent.find('input[type="text"]').instance().value = '';
    enzymeComponent.find('input[type="text"]').simulate('change');
    enzymeComponent.find('input[type="text"]').simulate('blur');
    // test that does not again get the status "invalid"
    // because there is no validations.required in the array passed to the validation prop -- so, it is not required to be filled in - but if it is, then it has to be the correct value
    expect(enzymeComponent.find('.MuiInput').instance().classList.contains('invalid')).toBe(false);
});

