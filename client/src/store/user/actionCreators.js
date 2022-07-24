import { USER_ACTIONS } from './actionTypes';

export const setUser = (user) => {
	return {
		type: USER_ACTIONS.LOGIN,
		payload: {
			name: user.name || '',
			email: user.email || '',
			token: user.token,
			role: user.role || '',
		},
	};
};

export const logout = () => {
	return {
		type: USER_ACTIONS.LOGOUT,
	};
};
