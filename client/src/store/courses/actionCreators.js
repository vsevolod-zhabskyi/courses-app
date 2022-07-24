import { COURSE_ACTIONS } from './actionTypes';
import CourseService from '../../services/CourseService';

export const addCourse = (course) => {
	return (dispatch) => {
		CourseService.create(course).then((course) => {
			dispatch({
				type: COURSE_ACTIONS.ADD_COURSE,
				payload: course,
			});
		});
	};
};

export const setCourses = (courses) => {
	return {
		type: COURSE_ACTIONS.SET_COURSES,
		payload: courses,
	};
};

export const deleteCourse = (id) => {
	return (dispatch) => {
		CourseService.delete(id).then((id) =>
			dispatch({
				type: COURSE_ACTIONS.DELETE_COURSE,
				payload: id,
			})
		);
	};
};

export const updateCourse = (course) => {
	return (dispatch) => {
		CourseService.update(course).then((course) =>
			dispatch({
				type: COURSE_ACTIONS.UPDATE_COURSE,
				payload: course,
			})
		);
	};
};
