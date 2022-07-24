import { USER_ACTIONS } from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '' || localStorage.getItem('token'),
	role: '',
};

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case USER_ACTIONS.LOGIN:
			if (action.payload.token) {
				localStorage.setItem('token', action.payload.token);
			}

			return {
				...state,
				isAuth: true,
				name: action.payload.name,
				email: action.payload.email,
				token: action.payload.token,
				role: action.payload.role,
			};
		case USER_ACTIONS.LOGOUT:
			localStorage.removeItem('token');

			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		default:
			return { ...state };
	}
};
