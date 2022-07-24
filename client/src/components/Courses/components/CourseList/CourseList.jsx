import React from 'react';
import CourseCard from '../CourseCard/CourseCard';
import { deleteCourse } from '../../../../store/courses/actionCreators';
import { COURSES_ROUTE, UPDATE_COURSE_ROUTE } from '../../../../routeConstants';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors } from '../../../../store/selectors';

function CourseList({ courses }) {
	const authors = useSelector(getAuthors);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleDeleteCourse = (course) => {
		dispatch(deleteCourse(course.id));
	};

	const editCourse = (course) => {
		navigate(`${UPDATE_COURSE_ROUTE}/${course.id}`);
	};

	const openCourse = (course) => {
		navigate(`${COURSES_ROUTE}/${course.id}`);
	};

	return (
		<div data-testid='course-list'>
			{courses.map((course) => (
				<CourseCard
					key={course.id}
					course={course}
					onDelete={handleDeleteCourse}
					onEdit={editCourse}
					onOpen={openCourse}
					authors={authors}
				/>
			))}
		</div>
	);
}

export default CourseList;
