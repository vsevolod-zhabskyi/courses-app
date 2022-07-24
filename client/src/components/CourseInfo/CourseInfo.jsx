import React, { useEffect, useState } from 'react';
import MyButton from '../../common/MyButton/MyButton';
import { useNavigate, useParams } from 'react-router-dom';
import { COURSES_ROUTE } from '../../routeConstants';
import { pipeDuration } from '../../helpers/pipeDuration';
import { pipeDate } from '../../helpers/pipeDate';
import { useSelector } from 'react-redux';
import { getAuthors, getCourses } from '../../store/selectors';

function CourseInfo(props) {
	const [course, setCourse] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const navigate = useNavigate();
	const params = useParams();

	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);

	useEffect(() => {
		const { id } = params;
		setCourse(courses.find((course) => course.id === id));
		setCourse((course) => ({
			...course,
			authors: authors.filter((author) => course.authors.includes(author.id)),
		}));
		setIsLoading(false);
	}, [courses, params]);

	return (
		<div className='p-3'>
			<MyButton
				buttonText='&#10094; Back to Courses'
				onClick={() => navigate(COURSES_ROUTE)}
				className='mb-3'
			/>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<>
					<h2 className='mb-5 text-center'>{course.title}</h2>
					<div className='d-flex justify-content-between'>
						<div className='col-6'>{course.description}</div>
						<div className='col-5'>
							<p>
								<b>ID: </b> {course.id}
							</p>
							<p>
								<b>Duration: </b> {pipeDuration(course.duration)} hours
							</p>
							<p>
								<b>Created: </b> {pipeDate(course.creationDate)}
							</p>
							<p>
								<b>Authors: </b>
							</p>
							{course.authors.map((author) => (
								<p key={author.id}>{author.name}</p>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default CourseInfo;
