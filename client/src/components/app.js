import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from './header';
import Signin from './auth/signin';
import Signout from './auth/signout';
import Signup from './auth/signup';
import Feature from './feature';
import Home from './home';
import requireAuth from './auth/require-auth';

export default class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<div className="container">
					<Route exact path="/" component={Home} />
					<Route path="/signin" component={Signin} />
					<Route path="/signout" component={Signout} />
					<Route path="/signup" component={Signup} />
					<Route path="/feature" component={requireAuth(Feature)} />
				</div>
			</div>
		);
	}
}
