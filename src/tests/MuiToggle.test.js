/*
    toggle (checkbox) is a difficult one - wasn't able to toggle (check, uncheck) it with enzyme
    have to use classic Javascript, which works fine for a simple use case like this
    so, this package requires react-test-renderer just for this page
*/
import React from "react";
import { MuiToggle, MuiForm, validations } from "./../index";
// for testing
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

/*
    render it
*/
class TestComponent extends React.Component {
  state = {};
  render() {
    return (
      <MuiForm stateScope={this}>
        <MuiToggle
          name="propertyName"
          stateScope={this}
          validations={[validations.required]}
        />
      </MuiForm>
    );
  }
}
const rootDiv = document.createElement("b");
rootDiv.setAttribute("id", "root");
document.body.appendChild(rootDiv);
ReactDOM.render(<TestComponent />, rootDiv);

/*
    check that it is rendered
*/
describe("it renders", () => {
  it('renders a <input type="checkbox"> element inside a ".MuiToggle" div', () => {
    expect(
      document.querySelector('.MuiToggle input[type="checkbox"]').type
    ).toBe("checkbox");
  });
});

/*
    check that it works
*/
describe("basic form functionality works", () => {
  it("performs validation", () => {
    // toggle on
    document.querySelector('input[type="checkbox"]').focus();
    document.querySelector('input[type="checkbox"]').click();
    document.querySelector('input[type="checkbox"]').blur();
    // toggle off
    document.querySelector('input[type="checkbox"]').focus();
    document.querySelector('input[type="checkbox"]').click();
    document.querySelector('input[type="checkbox"]').blur();
    // test that it is off and thus "invalid"
    expect(
      document.querySelector(".MuiToggle").classList.contains("invalid")
    ).toBe(true);
  });
});
