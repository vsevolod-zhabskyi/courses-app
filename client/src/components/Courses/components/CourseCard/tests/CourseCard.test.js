import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CourseCard from '../CourseCard';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

const mockState = {
	user: {
		isAuth: true,
		name: 'Test name',
	},
	courses: [],
	authors: [
		{
			id: '0cc9992d-77b2-4c1d-85b6-465f720f175a',
			name: 'Test author',
		},
	],
};

const mockCourse = {
	title: 'title',
	description: 'description',
	duration: 300,
	authors: ['0cc9992d-77b2-4c1d-85b6-465f720f175a'],
	creationDate: '9/3/2021',
	id: 'd91e6401-e436-4429-a60e-bdd406fc6090',
};

const mockAuthors = [
	{
		id: '0cc9992d-77b2-4c1d-85b6-465f720f175a',
		name: 'Test author',
	},
];

const mockStore = {
	getState: () => mockState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

describe('CourseCard', () => {
	test('displays course title', () => {
		render(
			<Provider store={mockStore}>
				<MemoryRouter>
					<CourseCard course={mockCourse} />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByText('title')).toBeInTheDocument();
	});

	test('displays course description', () => {
		render(
			<Provider store={mockStore}>
				<MemoryRouter>
					<CourseCard course={mockCourse} />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByText('description')).toBeInTheDocument();
	});

	test('displays course duration', () => {
		render(
			<Provider store={mockStore}>
				<MemoryRouter>
					<CourseCard course={mockCourse} />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByText('05:00 hours')).toBeInTheDocument();
	});

	test('displays course authors list', () => {
		render(
			<Provider store={mockStore}>
				<MemoryRouter>
					<CourseCard course={mockCourse} />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByText('Test author')).toBeInTheDocument();
	});

	test('displays course created date', () => {
		render(
			<Provider store={mockStore}>
				<MemoryRouter>
					<CourseCard course={mockCourse} />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByText('9.3.2021')).toBeInTheDocument();
	});
});
