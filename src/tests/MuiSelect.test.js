// for rendering the component
import React from 'react';
import { MuiSelect, MuiForm, validations } from './../index';
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
                <MuiSelect name="propertyName" stateScope={this} validations={[validations.required]}>
                    <option value="">this has no value, and will be selected by default, if user simply interacts with the select</option>
                    <option value="something">this has a valid value</option>
                </MuiSelect>
            </MuiForm>
        );
    }
}
const enzymeComponent = enzyme.mount(<TestComponent />);


/*
    check that it is rendered
*/
it('renders a <select/> element inside a ".MuiSelect" div', () => {
    expect(!!enzymeComponent.find('.MuiSelect select').instance()).toBe(true);
});



/*
    check that it works
*/
it('validation: fails if not valid', () => {
    // user action
    enzymeComponent.find('select').simulate('focus');
    enzymeComponent.find('select').simulate('blur');
    // test that it has className "invalid"
    expect(enzymeComponent.find('.MuiInput').instance().classList.contains('invalid')).toBe(true);
});
it('validation: succeeds if valid', () => {
    // user action
    enzymeComponent.find('select').simulate('focus');
    enzymeComponent.find('select').instance().value = 'something';
    enzymeComponent.find('select').simulate('blur');
    // test that it lost that "invalid"
    expect(enzymeComponent.find('.MuiInput').instance().classList.contains('invalid')).toBe(false);
});