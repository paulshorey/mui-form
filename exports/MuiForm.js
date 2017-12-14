/*eslint no-unused-vars: 2*/
import React from 'react';
import MuiButton from './MuiButton';
import * as Styled from './MuiFormStyled';

/*
	export: form
*/
// type StateMuiForm = any;
// type PropsMuiForm = {
// 	routes: [], // list of routes/urls/components from src/devices
// 	currentPath: {}, // window.location.pathname ... but more Reactive
// 	nav: {}, // window.store.unchangedv ... passed from NavConnected component below
// };
class MuiForm extends React.Component {
	/*
		extend parent component by modifying its properties:
		set up ${this.state} of parent element
		prefix everything added to ${this} or ${this.state} with "muiForm"
	*/
	constructor(props) {
		super(props);
	};

	/*
		MuiForm private methods
	*/
	userScrolledY(form) {
		/* 
			on scroll, called from lifecycle methods
		*/
		if (form) {
			// container form is target
			if (form.target) {
				// so we can pass to this the form or the parent object of the form
				form = form.target;
			}
			// to show tip only when at the top...
			// adjust (form.offsetHeight + N) as the tolerance - don't show custom scrollbar and arrow when almost at the end of form - session can figure that out themselves
			if (form.scrollTop + form.offsetHeight + 30 > form.scrollHeight) {
				form.classList.remove('scrollDown');
			} else {
				form.classList.add('scrollDown');
			}
		}
	};

	/*
		Start Lifecycle
	*/
	componentWillReceiveProps() {

		/*
			stateScope
			this.props.stateScope refers to ${this} of the parent/component which is importing MuiForm
			remember, we can't refer to it as ${this} here because here, ${this} means MuiForm. So, we use ${stateScope}
			to use this MuiForm and MuiInput components, must pass stateScope={this} to them
		*/
		var { stateScope } = this.props;

		/*
			state properties
		*/
		if (!stateScope.state) {
			stateScope.state = {};
		}

		// state (documented - maybe added by the user before including MuiForm)
		stateScope.state.muiFormValues =
			stateScope.state.muiFormValues !== undefined ? stateScope.state.muiFormValues : {};
		stateScope.state.muiFormButtons =
			stateScope.state.muiFormButtons !== undefined ? stateScope.state.muiFormButtons : {};

		// state (secret - system use only)
		stateScope.state.muiFormSubmitAttempted = false;
		stateScope.state.muiFormSubmitting = false;
		stateScope.state.muiFormChanged = false;
		stateScope.state.muiFormConnectionFailed = false;
		stateScope.state.muiFormInvalid = [];
		stateScope.state.muiFormValuesOriginal = JSON.parse(
			JSON.stringify(stateScope.state.muiFormValues)
		);

		/*
			non-state properties 
		*/

		// elements which have validation attribute will be added to this list
		stateScope.muiFormElementsToValidate = {};

		// validate
		stateScope.muiFormValidate = clearValidations => {
			var form = this.form;
			var event = {};
			var promise = new Promise((resolve, reject) => {
				// run through each validated field and check it
				for (let name in stateScope.muiFormElementsToValidate) {
					event = {};
					if (stateScope.muiFormElementsToValidate[name]) {
						let comp = stateScope.muiFormElementsToValidate[name];
						event = { target: form[name] };
						if (event.target) {
							var invalid = comp.handleValidate({
								event,
								value: stateScope.state.muiFormValues[name],
								clearValidations,
							});
							if (invalid) {
								reject(invalid);
							}
						}
					}
				}
				// all ok
				resolve(event, stateScope.state.muiFormValues);
			});
			return promise;
		};

		// reset
		stateScope.muiFormReset = () => {
			var { stateScope } = this.props;
			// scroll to top
			if (window.innerWidth <= 750) {
				// mobile - scroll body
				window.$('body').animate(
					{
						scrollTop: 0,
					},
					1000
				);
			} else {
				// desktop - scroll form
				window.$(this.form).animate(
					{
						scrollTop: 0,
					},
					1000
				);
			}
			// run through each validated field and check it (pass true to reset it!)
			stateScope.muiFormValidate(true);
			// finally, reset state values
			stateScope.setState({
				muiFormValues: JSON.parse(JSON.stringify(stateScope.state.muiFormValuesOriginal)),
				muiFormTouched: false,
				muiFormChanged: false,
				muiFormSubmitting: false,
				muiFormSubmitAttempted: false,
				muiFormInvalid: [],
			});
		};
		stateScope.muiFormReset();
	}

	/*
		MuiForm lifecycle methods
	*/
	componentDidMount() {
		/* 
			on scroll 
		*/
		if (this.form) {
			setTimeout(() => {
				this.userScrolledY(this.form);
			}, 500);
			this.form.addEventListener('scroll', this.userScrolledY);
		}
	}
	componentWillMount() {
		this.props.stateScope._isMounted = true;
	}
	componentWillUnmount() {
		this.props.stateScope._isMounted = false;
		/* 
			on scroll 
		*/
		if (this.form) {
			this.form.removeEventListener('scroll', this.userScrolledY);
		}
	}

	componentDidUpdate() {
		const { stateScope } = this.props;
		stateScope.state.muiFormInvalid.forEach((inputName, index, all) => {
			if (!this.form[inputName]) {
				stateScope.state.muiFormInvalid.splice(index, 1);
			}
		});
	}

	render() {
		const { stateScope, onChange, onSubmit, children, className, ...input } = this.props;

		const onFormChange = function(event) {
			if (onChange) {
				onChange(event);
			}
		};

		const onFormSubmit = function(event) {
			// ui
			event.preventDefault();
			stateScope.setState({
				muiFormSubmitting: true,
				muiFormSubmitAttempted: true,
				muiFormSuccess: false,
				muiFormError: false,
			});

			// validate each input - if fail, do not continue
			const promise = stateScope.muiFormValidate();

			// return sucess or failed to callback
			if (onSubmit) {
				onSubmit(promise);
			}
		};

		const PrimaryButton = (function() {
			/* = false means button is turned off */
			if (stateScope.state.muiFormButtons !== false) {
				if (
					/* submitting */
					stateScope.state.muiFormButtons.submitting !== false &&
					stateScope.state.muiFormSubmitting &&
					stateScope.state.muiFormSubmitAttempted &&
					!stateScope.state.muiFormInvalid.length
				) {
					return (
						<MuiButton className={'transparent success'} type="button">
							<b>Submitting...</b>
						</MuiButton>
					);
				} else if (
					/* invalid */
					stateScope.state.muiFormButtons.invalid !== false &&
					stateScope.state.muiFormChanged &&
					stateScope.state.muiFormTouched &&
					stateScope.state.muiFormSubmitAttempted &&
					stateScope.state.muiFormInvalid.length > 0
				) {
					return (
						<MuiButton className={'transparent error small'} type="button">
							<b>
								{stateScope.state.muiFormButtons.invalid === undefined ||
								stateScope.state.muiFormButtons.invalid === true ? (
									<span>Form not valid. <div>Please check fields highlighted red.</div></span>
								) : (
									stateScope.state.muiFormButtons.invalid
								)}
							</b>
						</MuiButton>
					);
				} else if (
					/* error */
					stateScope.state.muiFormButtons.error !== false &&
					stateScope.state.muiFormError &&
					stateScope.state.muiFormSubmitAttempted
				) {
					return (
						<MuiButton className={'transparent error small'} type="button">
							<b>
								{stateScope.state.muiFormButtons.error === undefined ||
								stateScope.state.muiFormButtons.error === true
									? stateScope.state.muiFormError ? stateScope.state.muiFormError : 'Error!'
									: stateScope.state.muiFormButtons.error}
							</b>
						</MuiButton>
					);
				} else if (
					/* submit */
					stateScope.state.muiFormButtons.submit !== false
				) {
					return (
						<MuiButton
							className={
								'' +
								(stateScope.state.muiFormInvalid === undefined ||
								(!stateScope.state.muiFormInvalid.length &&
									!stateScope.state.muiFormSubmitting &&
									(stateScope.state.muiFormChanged || !stateScope.state.muiFormTouched))
									? ' primary'
									: '')
							}
							disabled={
								(stateScope.state.muiFormInvalid.length && stateScope.state.muiFormSubmitAttempted) 
								|| stateScope.state.muiFormSubmitting
								|| !stateScope.state.muiFormChanged
								|| stateScope.state.muiFormInvalid.length
							}
							type="submit"
						>
							<b>
								{stateScope.state.muiFormButtons.submit === undefined ||
								stateScope.state.muiFormButtons.submit === true
									? 'Save Changes'
									: stateScope.state.muiFormButtons.submit}
							</b>
						</MuiButton>
					);
				}
			}
		})();

		// console.log('MuiForm state', JSON.stringify(stateScope.state, null, ' '));
		return (
			<Styled.FormScrollbars className="MuiForm_customScrollbars">
				<Styled.Form
					{...input}
					innerRef={form => (this.form = form)}
					className={
						'MuiForm' +
						(className ? ' ' + className : '') +
						(stateScope.state.muiFormConnectionFailed ? ' connectionFailed' : '') +
						(stateScope.state.muiFormSubmitAttempted ? ' submitAttempted' : '') +
						(stateScope.state.muiFormInvalid.length ? ' invalid' : '') +
						(stateScope.state.muiFormSubmitting ? ' submitting' : '') +
						(stateScope.state.muiFormTouched ? ' touched' : '') +
						(stateScope.state.muiFormChanged ? ' changed' : '')
					}
					autoComplete="off"
					onSubmit={onFormSubmit}
					onChange={onFormChange}
					onBlur={onFormChange}
					style={{ overflowY: 'scroll' }}
				>
					{children}

					<div className="formSubmitSpacer">
						{/* this is to add space "behind" the floating buttons */}
					</div>

					<div className="formSubmit">
						{/* primary button */}
						{PrimaryButton}

						{/* reset button */}
						{stateScope.state.muiFormButtons.reset !== false &&
							stateScope.state.muiFormChanged &&
							JSON.stringify(stateScope.state.muiFormValues) !==
								JSON.stringify(stateScope.state.muiFormValuesOriginal) && (
								<MuiButton className={''} type="button" onClick={stateScope.muiFormReset}>
									<b>
										{stateScope.state.muiFormButtons.reset === undefined ||
										stateScope.state.muiFormButtons.reset === true
											? 'Reset'
											: stateScope.state.muiFormButtons.reset}
									</b>
								</MuiButton>
							)}
					</div>

					<MuiButton
						className="clear scrollCue"
						type="button"
						innerRef={e => {
							stateScope.e = e;
						}}
						onClick={() => {
							window
								.$(stateScope.e.form)
								.animate({ scrollTop: stateScope.e.form.scrollHeight + 'px' }, 1000);
						}}
					>
						<b>
							<span className="fontIcon icon-carat_down" />
						</b>
					</MuiButton>
				</Styled.Form>
			</Styled.FormScrollbars>
		);
	}
}

export default MuiForm;
