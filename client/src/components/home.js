import React, { Component } from 'react';

export default class Home extends Component {
	render() {
		return (
			<div>
				<h1>Welcome to authentication prototype</h1>
				<p>
					This project is created to test out and learn how to create authentication from scratch in React.
					Frontend communicates with NodeJS backend that was also created from scratch for this project.
				</p>
				<p>
					Backend uses MongoDB as a database to save users. User logins are not persisted so refreshing page will log signed user out.
				</p>
				<p>
					Idea of this project is that there is a route '/feature' in which users cannot go unless they are logged in.
				</p>
			</div>
		);
	}
}