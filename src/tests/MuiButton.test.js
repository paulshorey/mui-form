import 'window/theme';

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { MuiButton } from './../exports/MuiButton';


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
const rootDiv = document.createElement('b');
rootDiv.setAttribute("id", "root");
document.body.appendChild(rootDiv);
ReactDOM.render(<TestComponent />,rootDiv);



/*
    check that it is rendered
*/
it('renders a <button> element inside a ".MuiButton" div', () => {
	// assuming our "render it" section above is not changed, and the regular type="button" button comes before the "submit" button...
    const MuiButtonDiv = document.querySelector('button.MuiButton');
    expect(MuiButtonDiv.type).toBe("button");
});



/*
    check that it works
*/
it('submits form if type="submit"', () => {
	// type="button"
	document.getElementById('buttonCancel').click();
	expect(window.formSubmitted).toEqual(undefined);
	// type="submit"
	document.getElementById('buttonSubmit').click();
	expect(window.formSubmitted).toEqual(true);
    
});