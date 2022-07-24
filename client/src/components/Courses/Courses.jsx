import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import MyButton from '../../common/MyButton/MyButton';
import { Link } from 'react-router-dom';
import { ADD_COURSE_ROUTE } from '../../routeConstants';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../store/selectors';
import CourseService from '../../services/CourseService';
import AuthorService from '../../services/AuthorService';
import { setCourses } from '../../store/courses/actionCreators';
import { setAuthors } from '../../store/authors/actionCreators';
import { useAdmin } from '../../hooks/useAdmin';
import CourseList from './components/CourseList/CourseList';

function Courses() {
	const courses = useSelector(getCourses);
	const isAdmin = useAdmin();

	const [searchQuery, setSearchQuery] = useState('');
	const [sortedCourses, setSortedCourses] = useState([]);
	const [loading, setLoading] = useState(true);

	const dispatch = useDispatch();

	const sortCourses = (courses) =>
		courses.filter(
			(course) =>
				course.id.includes(searchQuery) ||
				course.title.toLowerCase().includes(searchQuery)
		);

	useEffect(() => {
		Promise.all([CourseService.getAll(), AuthorService.getAll()]).then(
			([courses, authors]) => {
				dispatch(setCourses(courses));
				//todo
				// setSortedCourses(courses);
				dispatch(setAuthors(authors));
				setLoading(false);
			}
		);
	}, []);

	useEffect(() => {
		setSortedCourses(sortCourses(courses));
	}, [searchQuery, courses]);

	return (
		<div>
			<div className='d-flex mb-4 justify-content-between'>
				<div className='col-8'>
					<SearchBar onSearch={setSearchQuery} />
				</div>
				{isAdmin && (
					<div>
						<Link to={ADD_COURSE_ROUTE}>
							<MyButton buttonText='Add course' />
						</Link>
					</div>
				)}
			</div>
			<div>
				{loading ? <p>Loading...</p> : <CourseList courses={sortedCourses} />}
			</div>
		</div>
	);
}

export default Courses;
