import axios from 'axios';

import history from '../utils/history';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3000';

export function signinUser({ email, password }) {
	return (dispatch) => {
		axios.post(`${ROOT_URL}/signin`, { email, password })
			.then((res) => {
				dispatch({ type: AUTH_USER });
				localStorage.setItem('token', res.headers['x-auth']);
				history.push('/feature');
			})
			.catch((e) => {
				dispatch(setAuthError('Bad Login Info'));
			});
	}
}

export function signupUser({ email, password }) {
	return (dispatch) => {
		axios.post(`${ROOT_URL}/signup`, { email, password })
			.then((res) => {
				dispatch({ type: AUTH_USER });
				localStorage.setItem('token', res.headers['x-auth']);
				history.push('/feature');
			})
			.catch((error) => {
				dispatch(setAuthError(error.response.data.error));
			});
	}
}

export function setAuthError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function signoutUser(token) {
	localStorage.removeItem('token');
	return {
		type: UNAUTH_USER
	}
}

export function fetchMessage() {
	return (dispatch) => {
		axios.get(ROOT_URL, { headers: { 'x-auth': localStorage.getItem('token') } })
			.then((res) => {
				dispatch({
					type: FETCH_MESSAGE,
					payload: res.data.message
				});
			}).catch((e) => {
				if (e.response.status === 401) {
					dispatch(signoutUser());
					history.push('/');
				}
			});
	}
}