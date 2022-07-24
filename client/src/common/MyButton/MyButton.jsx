import React from 'react';
import { Button } from 'react-bootstrap';

function MyButton({ buttonText, onClick, color, ...props }) {
	return (
		<Button
			onClick={onClick}
			className={color ? 'btn-' + color : ''}
			{...props}
		>
			{buttonText}
		</Button>
	);
}

export default MyButton;
