import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

	renderLinks() {
		if (this.props.authenticated) {
			return (
				<li className="nav-item">
					<Link className="nav-link" to="/signout">Sign out</Link>
				</li>
			);
		} else {
			return [
				<li className="nav-item" key="signinlink">
					<Link className="nav-link" to="/signin">Sign in</Link>
				</li>,
				<li className="nav-item" key="signuplink">
					<Link className="nav-link" to="/signup">Sign up</Link>
				</li>
			];
		}
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#d2d4dc'}}>
				<div className="container-fluid">
					<div className="navbar-header">
						<Link to="/" className="navbar-brand">Redux Auth</Link>
					</div>
					<ul className="nav navbar-nav">
						{this.renderLinks()}
					</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);