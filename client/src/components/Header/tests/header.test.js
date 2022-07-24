import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Header from '../Header';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const mockState = {
	user: {
		isAuth: true,
		name: 'Test name',
	},
	courses: [],
	authors: [],
};

const mockStore = {
	getState: () => mockState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

describe('header', () => {
	test('renders user name and logo', () => {
		render(
			<Provider store={mockStore}>
				<MemoryRouter>
					<Header />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByText(/Test name/)).toBeInTheDocument();
		expect(screen.getByAltText(/Courses/)).toBeInTheDocument();
	});
});
