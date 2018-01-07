/*eslint no-unused-vars: 2*/
import React from 'react';

// import { isEqualShallow, get_property } from 'functions';
import * as Styled from './MuiButtonStyled';

/*
	export: button
	* not used in MuiForm - only serves as export for Storybook
*/
export class MuiButton extends React.Component {
	render() {
		const { children, ...attributes } = this.props;
		return (
			<div className="MuiButton">
				<Styled.Button {...attributes}>
					{children}
				</Styled.Button>
			</div>
		);
	}
}

export default MuiButton;
