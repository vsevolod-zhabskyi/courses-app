import React from 'react';
import MyButton from '../../../common/MyButton/MyButton';

function AuthorItem({ author, onAdd, onRemove }) {
	return (
		<div className='d-flex mb-1 justify-content-between align-items-center'>
			<div>{author.name}</div>
			{onAdd && (
				<MyButton buttonText='Add author' onClick={() => onAdd(author.id)} />
			)}
			{onRemove && (
				<MyButton
					buttonText='Remove author'
					onClick={() => onRemove(author.id)}
				/>
			)}
		</div>
	);
}

export default AuthorItem;
