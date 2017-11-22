import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.removeError = this.removeError.bind(this);
	}

	removeError() {
		if(this.props.errorMessage) {
			this.props.setAuthError(null);
		}
	}

	renderField({ input, label, type, meta: { touched, error } }) {
		return (
			<fieldset className="form-group">
				<label htmlFor={name}>{label}</label>
				<input className="form-control" {...input} type={type} />
				{touched && error && <span className="text-danger">{error}</span>}
			</fieldset>
		);
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			);
		}
	}

	handleFormSubmit({ email, password }) {
		this.props.signupUser({ email, password });
	}

	render() {
		const { handleSubmit, } = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit)}>
				<Field name="email" label="Email" type="email" onChange={this.removeError} component={this.renderField} />
				<Field name="password" label="Password" type="password" onChange={this.removeError} component={this.renderField} />
				<Field name="confirmPassword" label="Confirm password" type="password" onChange={this.removeError} component={this.renderField} />
				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">Sign up</button>
			</form>
		);
	}
}

const validate = (formProps) => {
	var errors = {};
	const { email, password, confirmPassword } = formProps;
	const requiredFields = ['email', 'password', 'confirmPassword'];

	errors = validateRequiredFields(requiredFields, formProps);

	if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
		errors.email = 'Enter valid email address';
	}

	if (password !== confirmPassword) {
		errors.confirmPassword = 'Does not match password';
	}

	return errors
}

const validateRequiredFields = (requiredFields, formProps) => {
	var errors = {};
	requiredFields.map((x) => {
		if (!formProps[x]) {
			errors[x] = 'Field is required';
		}
	});
	return errors;
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.error }
}

export default connect(mapStateToProps, actions)(
	reduxForm({
		validate: validate,
		form: 'signup'
	})(Signup)
);