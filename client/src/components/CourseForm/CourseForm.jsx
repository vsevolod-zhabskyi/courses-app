import React, { useEffect, useState } from 'react';
import MyInput from '../../common/Input/MyInput';
import MyButton from '../../common/MyButton/MyButton';
import AuthorItem from './AuthorItem/AuthorItem';
import { pipeDuration } from '../../helpers/pipeDuration';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse, updateCourse } from '../../store/courses/actionCreators';
import { getAuthors } from '../../store/selectors';
import { addAuthor, setAuthors } from '../../store/authors/actionCreators';
import AuthorService from '../../services/AuthorService';
import { useCheckLocation } from '../../hooks/useCheckLocation';
import { COURSES_ROUTE, UPDATE_COURSE_ROUTE } from '../../routeConstants';
import CourseService from '../../services/CourseService';

function CourseForm() {
	const [course, setCourse] = useState({
		id: null,
		title: '',
		description: '',
		duration: '',
		authors: [],
	});

	const [availableAuthors, setAvailableAuthors] = useState([]);
	const [courseAuthors, setCourseAuthors] = useState([]);

	const [newAuthorName, setNewAuthorName] = useState('');

	const isEditPage = useCheckLocation(UPDATE_COURSE_ROUTE);

	const params = useParams();
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const authors = useSelector(getAuthors);

	useEffect(() => {
		AuthorService.getAll().then((authors) => dispatch(setAuthors(authors)));

		if (!isEditPage) return;

		const { id } = params;

		CourseService.getById(id).then((course) => {
			setCourse(course);
		});
	}, []);

	useEffect(() => {
		setCourseAuthors(
			authors.filter((author) => course.authors.includes(author.id))
		);
		setAvailableAuthors(
			authors.filter((author) => !course.authors.includes(author.id))
		);
	}, [authors, course]);

	const addCourseAuthor = (id) => {
		setCourse({
			...course,
			authors: [...course.authors, id],
		});
	};

	const removeCourseAuthor = (id) => {
		setCourse({
			...course,
			authors: course.authors.filter((author) => author !== id),
		});
	};

	const createAuthor = () => {
		if (newAuthorName === '') {
			alert('Author name cannot be empty!');
			return;
		}
		dispatch(addAuthor(newAuthorName));

		setNewAuthorName('');
	};

	const submit = () => {
		if (!isCourseValid()) {
			alert('All fields are required');
			return;
		}

		if (isEditPage) {
			dispatch(updateCourse(course));
		} else {
			dispatch(addCourse(course));
		}

		setCourse({
			title: '',
			description: '',
			duration: '',
			authors: [],
		});

		navigate(COURSES_ROUTE);
	};

	const isCourseValid = () => {
		return (
			course.title &&
			course.description &&
			course.duration &&
			course.authors.length
		);
	};

	const handleDurationChange = (newValue) => {
		if (isNaN(newValue)) {
			return;
		}

		setCourse({
			...course,
			duration: Number(newValue),
		});
	};

	return (
		<div>
			<div className='d-flex justify-content-between mb-3'>
				<MyInput
					className='col-4 lead'
					labelText='Title'
					placeholderText='Enter title...'
					value={course.title}
					onChange={(value) => setCourse({ ...course, title: value })}
				/>

				<MyButton
					buttonText={isEditPage ? 'Save' : 'Create'}
					className='align-self-end px-4'
					onClick={submit}
				/>
			</div>

			<MyInput
				className='mb-3 lead'
				labelText='Description'
				placeholderText='Enter description...'
				textarea={true}
				value={course.description}
				onChange={(value) => setCourse({ ...course, description: value })}
			/>

			<div className='d-flex p-3 pb-0 border'>
				<div className='col-md-6 col-sm-4'>
					<div className='d-flex mb-5 flex-column align-items-center'>
						<h3 className='mb-3'>Add author</h3>
						<MyInput
							className='mb-3 align-self-stretch lead'
							labelText='Author name'
							placeholderText='Enter author name...'
							value={newAuthorName}
							onChange={setNewAuthorName}
						/>
						<MyButton buttonText='Create author' onClick={createAuthor} />
					</div>

					<div className='d-flex flex-column align-items-center'>
						<h3 className='mb-3'>Duration</h3>
						<MyInput
							className='mb-3 align-self-stretch lead'
							labelText='Duration'
							placeholderText='Enter duration in minutes...'
							value={course.duration ? course.duration : ''}
							onChange={handleDurationChange}
						/>
						<p className='lead align-self-start'>
							Duration:{' '}
							<span className='h4'>{pipeDuration(course.duration)}</span> hours
						</p>
					</div>
				</div>

				<div className='col-md-6 col-sm-8 px-5 text-center'>
					<div className='mb-4'>
						<h3 className='mb-3'>Authors</h3>
						{availableAuthors.length ? (
							<div>
								{availableAuthors.map((author) => (
									<AuthorItem
										key={author.id}
										author={author}
										onAdd={addCourseAuthor}
									/>
								))}
							</div>
						) : (
							<p>No authors found</p>
						)}
					</div>
					<div>
						<h3 className='mb-3'>Course Authors</h3>
						{courseAuthors.length ? (
							<div>
								{courseAuthors.map((author) => (
									<AuthorItem
										key={author.id}
										author={author}
										onRemove={removeCourseAuthor}
									/>
								))}
							</div>
						) : (
							<p>Authors are not added</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default CourseForm;
