// for rendering the component
import React from 'react';
import { MuiButton } from './../index';
// for testing
import * as enzyme from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });


/*
    render it
*/
class TestComponent extends React.Component {
	render() {
		return (
			<form onSubmit={()=>{
					window.formSubmitted = true;
				}}>
				<MuiButton type="button" id="buttonCancel" />
				<MuiButton type="submit" id="buttonSubmit" />
			</form>
		);
	}
}
const enzymeComponent = enzyme.mount(<TestComponent />);



/*
    check that it is rendered
*/
it('renders a <button> element inside a ".MuiButton" div', () => {
	expect(!!enzymeComponent.find('button[type="button"].MuiButton').instance()).toBe(true);
	expect(!!enzymeComponent.find('button[type="submit"].MuiButton').instance()).toBe(true);
});



/*
    check that it works
*/
it('submits form if type="submit"', () => {
    // user action
    enzymeComponent.find('button[type="button"]').instance().click();
    // check that form failed to submit
	expect(window.formSubmitted).toEqual(undefined);
});
it('submits form if type="submit"', () => {
    // user action
    enzymeComponent.find('button[type="submit"]').instance().click();
    // check that form was submitted
	expect(window.formSubmitted).toEqual(true);
    
});