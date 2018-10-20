import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';

import { LOGIN_USER, LOGED_USER, LOGIN_FAILED, LOGOUT_USER } from './types';

const api = 'http://localhost:9020/users/login';

export const loginUser = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: LOGIN_USER,
			payload: {
				isLoading: true
			}
		});
		await axios
			.post(api, {
				email,
				password
			})
			.then((response) => {
				const message = response.data.message || null;

				const isTokenEmpty = _isEmpty(response.data.token);

				const isUserEmpty = _isEmpty(response.data.user);

				if (!isTokenEmpty) {
					localStorage.setItem('token', response.data.token);
				}

				if (!isUserEmpty) {
					localStorage.setItem('user', JSON.stringify(response.data.user));
					localStorage.setItem('isAuth', true);

					dispatch({
						type: LOGED_USER,
						payload: {
							token: response.data.token,
							user: response.data.user,
							success: response.data.status,
							isLoading: false,
							isAuth: true,
							message
						}
					});
				} else {
					dispatch({
						type: LOGIN_FAILED,
						payload: {
							success: response.data.status,
							isLoading: false,
							isAuth: false,
							message
						}
					});
				}
			})
			.catch((error) => {
				console.log('error', error);
			});
	} catch (err) {
		console.log('Login Failed:', err);

		dispatch({
			type: LOGIN_FAILED,
			payload: {
				success: false,
				message: 'Unable to connect to authentication server'
			}
		});
	}
};

export const logoutUser = () => async (dispatch) => {
	const isTokenEmpty = _isEmpty(localStorage.setItem('token'));
	const isUserEmpty = _isEmpty(localStorage.setItem('user'));

	if (!isTokenEmpty) {
		localStorage.removeItem('token');
	}

	if (!isUserEmpty) {
		localStorage.removeItem('user');
		localStorage.removeItem('isAuth');

		dispatch({
			type: LOGOUT_USER,
			payload: {
				isAuth: false
			}
		});
	}
};
