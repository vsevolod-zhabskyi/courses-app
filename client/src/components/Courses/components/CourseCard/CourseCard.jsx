import React from 'react';
import { Col } from 'react-bootstrap';
import TruncateString from 'react-truncate-string/dist/truncateString';
import { pipeDuration } from '../../../../helpers/pipeDuration';
import { pipeDate } from '../../../../helpers/pipeDate';
import MyButton from '../../../../common/MyButton/MyButton';
import { useAdmin } from '../../../../hooks/useAdmin';

function CourseCard({ course, authors, onDelete, onEdit, onOpen }) {
	const courseAuthors = authors.filter((author) =>
		course.authors.includes(author.id)
	);
	const isAdmin = useAdmin();

	return (
		<div className='d-flex p-4 mb-4 border' data-testid='course-list__item'>
			<Col className='col-8 p-0 text-left'>
				<h3>{course.title}</h3>
				<p className='m-0'>{course.description}</p>
			</Col>
			<Col className='col-4 p-2 '>
				<div className='d-flex'>
					<p>
						<b>Authors:&nbsp;</b>
					</p>
					<TruncateString
						text={courseAuthors.map((author) => author.name).join(', ')}
						truncateAt={100}
					/>
				</div>
				<p>
					<b>Duration: </b>
					{pipeDuration(course.duration)} hours
				</p>
				<p>
					<b>Created: </b>
					{pipeDate(course.creationDate)}
				</p>
				<div className='d-flex justify-content-center'>
					<MyButton
						className='mx-1'
						buttonText='Open'
						onClick={() => onOpen(course)}
					/>
					{isAdmin && (
						<>
							<MyButton
								className='mx-1'
								buttonText='Delete'
								onClick={() => onDelete(course)}
							/>
							<MyButton
								className='mx-1'
								buttonText='Edit'
								onClick={() => onEdit(course)}
							/>
						</>
					)}
				</div>
			</Col>
		</div>
	);
}

export default CourseCard;
