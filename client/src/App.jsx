import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import { Route, Routes, Navigate } from 'react-router-dom';
import CourseForm from './components/CourseForm/CourseForm';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import {
	ADD_COURSE_ROUTE,
	COURSES_ROUTE,
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
	UPDATE_COURSE_ROUTE,
} from './routeConstants';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/user/actionCreators';
import { getUser } from './store/selectors';
import AuthService from './services/AuthService';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
	const user = useSelector(getUser);
	const [isLoading, setIsLoading] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		AuthService.check()
			.then((user) => {
				dispatch(setUser(user));
			})
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) {
		return <h3>Loading...</h3>;
	}

	return (
		<Container>
			<Header />
			<Routes>
				<Route path={REGISTRATION_ROUTE} element={<Registration />} />
				<Route path={LOGIN_ROUTE} element={<Login />} />
				{user.isAuth && (
					<>
						<Route path={COURSES_ROUTE} element={<Courses />} />
						<Route path={`${COURSES_ROUTE}/:id`} element={<CourseInfo />} />
						<Route
							path={ADD_COURSE_ROUTE}
							element={
								<PrivateRoute>
									<CourseForm />
								</PrivateRoute>
							}
						/>
						<Route
							path={`${UPDATE_COURSE_ROUTE}/:id`}
							element={
								<PrivateRoute>
									<CourseForm />
								</PrivateRoute>
							}
						/>
						<Route path='*' element={<Navigate to={COURSES_ROUTE} replace />} />
					</>
				)}
				<Route path='*' element={<Navigate to={LOGIN_ROUTE} replace />} />
			</Routes>
		</Container>
	);
}

export default App;
