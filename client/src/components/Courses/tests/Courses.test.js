import { mockCourseList } from '../../../store/tests/mocks/mockCourseList';
import { Provider } from 'react-redux';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Courses from '../Courses';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ADD_COURSE_ROUTE } from '../../../routeConstants';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));

jest.mock('../../../services/CourseService', () => ({
	getAll: jest.fn().mockResolvedValue([]),
}));
jest.mock('../../../services/AuthorService', () => ({
	getAll: jest.fn().mockResolvedValue([]),
}));

const mockState = {
	user: {
		isAuth: true,
		name: 'Test name',
		role: 'admin',
	},
	courses: mockCourseList,
	authors: [
		{
			id: '0cc9992d-77b2-4c1d-85b6-465f720f175a',
			name: 'Test author',
		},
	],
};

const mockStore = {
	getState: () => mockState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

describe('Courses', () => {
	test('renders all courses', async () => {
		render(
			<Provider store={mockStore}>
				<MemoryRouter>
					<Courses />
				</MemoryRouter>
			</Provider>
		);

		expect((await screen.findAllByTestId('course-list__item')).length).toBe(3);
	});

	test('renders empty list', async () => {
		const mockEmptyState = {
			user: {},
			courses: [],
			authors: [],
		};

		const mockEmptyStore = {
			getState: () => mockEmptyState,
			subscribe: jest.fn(),
			dispatch: jest.fn(),
		};

		render(
			<Provider store={mockEmptyStore}>
				<MemoryRouter>
					<Courses />
				</MemoryRouter>
			</Provider>
		);

		await screen.findByTestId('course-list');

		expect(screen.queryAllByTestId('course-list__item').length).toBe(0);
	});

	test('form opens on create button click', async () => {
		const history = createMemoryHistory();

		history.push = jest.fn();

		await act(async () => {
			render(
				<Provider store={mockStore}>
					<Router location={history.location} navigator={history}>
						<Courses />
					</Router>
				</Provider>
			);
		});

		fireEvent.click(screen.getByText(/Add course/));

		expect(history.push.mock.calls[0][0].pathname).toBe(ADD_COURSE_ROUTE);
	});
});
