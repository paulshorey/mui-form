/*eslint no-unused-vars: 2*/
import $ from "jquery";
import React from "react";

import { _get_property, _set_property } from "../functions";

/*
	export: input
*/
class MuiInput extends React.Component {
  constructor(props) {
    super(props);
    var { stateScope, validations, onChange } = this.props;

    // this
    this.state = {
      invalid: false,
      touched: false,
      changed: false
    };

    /*
			initially, validate - but update form validity only, dont mess with this input until touched by session
		*/
    this.onLoad = (event, value) => {
      // checkbox uses checked instead of value, so it must be passed in and caught here
      // with this if statement, we can pass a pre-filtered value from any type of field as well
      if (value === undefined || typeof value === "object") {
        value = event.target.value;
      }

      // initial validate
      if (validations) {
        var muiFormInvalid = stateScope.state.muiFormInvalid || [];
        var invalid = this.validate(value, validations);
        var inIndex = muiFormInvalid.indexOf(event.target.name);
        // update local
        if (invalid || invalid === "") {
          this.setState({ invalid: true });
          // if name is not already in array (was valid), add
          if (inIndex === -1) {
            muiFormInvalid.push(event.target.name);
          }
        } else {
          this.setState({ invalid: false });
          // if name is already in array (was invalid), remove
          if (inIndex !== -1) {
            muiFormInvalid.splice(inIndex, 1);
          }
        }
        // update form
        stateScope.setState({
          muiFormInvalid: muiFormInvalid,
          muiFormTouched: true
        });
      }
    };

    /*
			actions
		*/
    this.handleChange = (event, value) => {
      // select and toggle get special treatment
      // they're not ok with just reading value from event.target.value
      // this if is for regular inputs, select and toggle get value passed as second parameter
      if (value === undefined || typeof value === "object") {
        value = event.target.value;
      }

      // update form
      _set_property(stateScope.state.muiFormValues, event.target.name, value);
      if (
        _get_property(
          stateScope.state.muiFormValuesOriginal,
          event.target.name
        ) === undefined
      ) {
        _set_property(
          stateScope.state.muiFormValuesOriginal,
          event.target.name,
          ""
        );
      }
      stateScope.setState({
        muiFormTouched: true,
        muiFormChanged:
          JSON.stringify(stateScope.state.muiFormValues) !==
          JSON.stringify(stateScope.state.muiFormValuesOriginal)
      });

      // update input
      this.setState({
        touched: true,
        changed:
          _get_property(
            stateScope.state.muiFormValuesOriginal,
            event.target.name
          ) !== value
      });

      // pass through actions
      if (onChange) {
        onChange(event);
      }

      // toggle and select get special treatment
      if (
        event.target.type === "checkbox" ||
        event.target.type.indexOf("select") !== -1
      ) {
        event.target.blur();
      }
    };

    /*
			validations
		*/
    this.handleValidate = params => {
      // if called manually for validation, the event is passed in as a prop
      if (params.event) {
        var { value, clearValidations, reject } = params;
        var event = params.event; // can't re-declare - because there already is an inherent event variable floating around in this scope??? idk
      } else {
        // if this is an actual DOM event handler, then params are the event, as in an onClick
        // eslint-disable-next-line
        var event = params;
        // partial reset
        var whatToReset = { muiFormSubmitting: false };
        // if (!stateScope.state.muiFormInvalid.length) {
        whatToReset.muiFormSubmitAttempted = false;
        // }
        stateScope.setState(whatToReset);
      }

      // select and toggle get special treatment
      // they're not ok with just reading value from event.target.value
      // this if is for regular inputs, select and toggle get value passed as second parameter
      if (value === undefined || typeof value === "object") {
        value = event.target.value;
      }

      // validate
      if (validations) {
        var formInvalid = stateScope.state.muiFormInvalid || [];
        var invalid = clearValidations
          ? false
          : this.validate(value, validations);
        var inIndex = formInvalid.indexOf(event.target.name);
        // update local
        if (invalid || invalid === "") {
          this.setState({ invalid: invalid });
          // if name is not already in array (was valid), add
          if (inIndex === -1) {
            formInvalid.push(event.target.name);
          }
          // focus on this field
          if (window.innerWidth <= 750) {
            // mobile - scroll body
            $("body").animate(
              {
                scrollTop:
                  $(event.target).offset().top -
                  $(event.target.form).height() / 2
              },
              1000
            );
          } else {
            // desktop - scroll body to top to be consistent
            $("body").animate(
              {
                scrollTop: 0
              },
              1000
            );
            // desktop - scroll box
            $(event.target.form).animate(
              {
                scrollTop:
                  event.target.offsetTop - $(event.target.form).height() / 2
              },
              1000
            );
          }
          if (reject) {
            reject("Form is not valid.");
          }
        } else {
          this.setState({ invalid: false });
          // if name is already in array (was invalid), remove
          if (inIndex !== -1) {
            formInvalid.splice(inIndex, 1);
          }
        }

        // update form
        stateScope.setState({
          muiFormInvalid: formInvalid,
          muiFormTouched: true
        });
        // force update
        // when form becomes valid or invalid
        // if (!stateScope.state.muiFormInvalid.length !== !muiFormInvalidBefore.length) {
        // yes, force updating it every time is not an efficient or best way to do it...
        // but, it is very simple to understand, maintain, and our app can handle it because it is so light anyway
        // still, we should be thinking of a way to do this without updating the entire form component every time
        stateScope.forceUpdate();
        // }
      }

      // toggle and select get special treatment
      if (
        event.target.type === "checkbox" ||
        event.target.type.indexOf("select") !== -1
      ) {
        this.setState({ invalid: invalid });
      }

      // return false == OK
      // return true || the invalidation
      if (invalid || invalid === "") {
        return invalid || true;
      } else {
        return false;
      }
    };
    this.validate = function(value, validations) {
      // allow parameter to be string instead single value array
      if (typeof validations === "string") {
        validations = [validations];
      }

      // run each validation
      if (validations.length) {
        var errorMessage = false;
        validations.forEach(function(validationFunction, index) {
          if (!errorMessage) {
            errorMessage = validationFunction(value);
            // console.warn(errorMessage);
            if (errorMessage) {
              // tell the form
              return;
            }
          }
        });
        // return first fail, or false if ok
        return errorMessage || false;
        // this.setState({invalid: errorMessage || false });
      }
    };
  }

  componentWillReceiveProps() {
    var { stateScope, validations, name } = this.props;

    // add this to parent form
    if (validations) {
      stateScope.muiFormElementsToValidate = Object.assign({
        ...stateScope.muiFormElementsToValidate,
        [name]: this
      });
    }
  }
  // componentWillMount(){
  // 	this.props.stateScope.setState({ muiFormSubmitAttempted: false });
  // }

  render() {
    var {
      stateScope,
      onChange,
      validations,
      value,
      options,
      type,
      ...input
    } = this.props;

    // ignore this >>>
    // need to declare above: onChange, validations, value, options
    // so they will not sometimes be part of the desctructured variable: ...input, also above
    if (stateScope || onChange || validations || value || options || type) {
      /* can't silence Webpack React no-unused-vars warning, but these values must always be declared */
    }
    // <<< ignore this

    const Messages =
      this.state.invalid || this.state.invalid === "" ? (
        <div className="control_message invalid">{this.state.invalid}</div>
      ) : (
        ""
      );

    const formValue = _get_property(stateScope.state.muiFormValues, input.name);

    return (
      <div
        className={
          "control MuiInput" +
          (this.state.invalid ? " invalid" : "") +
          (this.state.touched ? " touched" : "") +
          (this.state.changed ? " changed" : "")
        }
      >
        <input
          {...input}
          type={type || "text"}
          value={formValue}
          onChange={this.handleChange}
          onBlur={this.handleValidate}
        />
        {Messages}
      </div>
    );
  }
}

export default MuiInput;
