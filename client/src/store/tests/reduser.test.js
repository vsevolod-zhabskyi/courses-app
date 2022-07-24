import { courseReducer } from '../courses/reducer';
import { createStore } from 'redux';
import { COURSE_ACTIONS } from '../courses/actionTypes';
import { mockCourseItem } from './mocks/mockCourseItem';
import { mockCourseList } from './mocks/mockCourseList';

describe('course reducer', () => {
	const store = createStore(courseReducer);

	test('returns initial state', () => {
		expect(store.getState()).toEqual([]);
	});

	test('handles ADD_COURSE ', () => {
		store.dispatch({
			type: COURSE_ACTIONS.ADD_COURSE,
			payload: mockCourseItem,
		});
		expect(store.getState()).toEqual([mockCourseItem]);
	});

	test('handles SET_COURSES ', () => {
		store.dispatch({
			type: COURSE_ACTIONS.SET_COURSES,
			payload: mockCourseList,
		});
		expect(store.getState()).toEqual(mockCourseList);
	});
});
