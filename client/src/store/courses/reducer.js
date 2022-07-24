import { COURSE_ACTIONS } from './actionTypes';

export const courseReducer = (state = [], action) => {
	switch (action.type) {
		case COURSE_ACTIONS.ADD_COURSE:
			return [...state, action.payload];
		case COURSE_ACTIONS.SET_COURSES:
			return [...action.payload];
		case COURSE_ACTIONS.DELETE_COURSE:
			return state.filter((course) => course.id !== action.payload);
		case COURSE_ACTIONS.UPDATE_COURSE:
			return state.map((course) =>
				course.id === action.payload.id ? action.payload : course
			);
		default:
			return state;
	}
};
