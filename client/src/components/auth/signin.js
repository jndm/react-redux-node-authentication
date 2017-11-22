import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signin extends Component {
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

	handleFormSubmit({ email, password }) {
		this.props.signinUser({ email, password });
	}

	renderAlert() {
		if(this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			);
		}
	}

	render() {
		// Get handle submit and fields from redux form
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit)}>
				<fieldset className="form-group">
					<label htmlFor="email">Email</label>
					<Field name="email" component="input" className="form-control" type="email" onChange={this.removeError}/>
				</fieldset>
				<fieldset className="form-group">
					<label htmlFor="password">Password</label>
					<Field name="password" component="input" className="form-control" type="password" onChange={this.removeError}/>
				</fieldset>
				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">Sign in</button>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({ form: 'signin' })(Signin));