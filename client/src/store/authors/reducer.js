import { AUTHOR_ACTIONS } from './actionTypes';

export const authorReducer = (state = [], action) => {
	switch (action.type) {
		case AUTHOR_ACTIONS.ADD_AUTHOR:
			return [...state, action.payload];
		case AUTHOR_ACTIONS.SET_AUTHORS:
			return [...action.payload];
		default:
			return state;
	}
};
