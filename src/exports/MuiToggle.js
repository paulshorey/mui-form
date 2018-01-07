/*eslint-disable no-unused-vars*/
import React from "react";

import MuiInput from "./MuiInput";

import { _get_property } from "../functions";

/*
	export: toggle
	inherited from MuiInput
*/
class MuiToggle extends MuiInput {
  render() {
    // must decalare: onChange,onBlur,validations,value,options,checked to prevent them from going into {...input}
    var {
      stateScope,
      onChange,
      onBlur,
      validations,
      value,
      options,
      checked,
      toggled,
      labelOn,
      labelOff,
      ...input
    } = this.props;

    // value, onChange, and onBlur are non-standard in checkbox and select elements
    const formValue = _get_property(stateScope.state.muiFormValues, input.name);
    var handleChange = event => {
      var value = event.target.checked;
      this.handleChange(event, value);
      if (onChange) {
        // onChange(event, value);
      }
    };
    var handleBlur = event => {
      var value = event.target.checked;
      this.handleValidate({ event, value });
      if (onBlur) {
        // onChange(event, value);
      }
    };

    return (
      <div
        className={
          "control MuiInput MuiToggle" +
          (this.state.invalid ? " invalid" : "") +
          (this.state.touched ? " touched" : "") +
          (this.state.changed ? " changed" : "")
        }
      >
        <label className="toggle">
          {labelOff && <span className="labelOff">{labelOff}</span>}
          <input
            type="checkbox"
            {...input}
            checked={formValue || false}
            value={true}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className="lever" />
          {labelOn && <span className="labelOn">{labelOn}</span>}
        </label>
        {(this.state.invalid || this.state.invalid === "") && (
          <div className="control_message invalid">{this.state.invalid}</div>
        )}
      </div>
    );
  }
}

export default MuiToggle;
