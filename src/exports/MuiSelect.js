/*eslint-disable no-unused-vars*/
import React from 'react';

import MuiInput from './MuiInput';

import { _get_property } from '../functions';

/*
	export: select
	inherited from MuiInput
*/
class MuiSelect extends MuiInput {
	                                        render() {
		// must decalare: onChange,validations,value,options to prevent them from going into {...input}
		                                        var { stateScope, onChange, validations, value, options, children, ...input } = this.props;
		
		// input value is non-standard in checkbox and select elements
		                                        const formValue = _get_property(stateScope.state.muiFormValues, input.name);

		                                        return (
			<div
				className={
					'control MuiInput MuiSelect' +
					(this.state.invalid ? ' invalid' : '') +
					(this.state.touched ? ' touched' : '') +
					(this.state.changed ? ' changed' : '')
				}
			>
				<select
					{...input}
					value={formValue}
					onChange={this.handleChange}
					onBlur={this.handleValidate}
				>
					{children}
				</select>
				{(this.state.invalid || this.state.invalid === '') && (
					<div className="control_message invalid">{this.state.invalid}</div>
				)}
			</div>
		);
	}
}

export default MuiSelect;
