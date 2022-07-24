import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

function MyInput({
	value,
	onChange,
	labelText,
	placeholderText,
	textarea,
	className,
	type,
}) {
	return (
		<Form.Group className={className}>
			{labelText && <Form.Label className='lh-1'>{labelText}</Form.Label>}
			<FormControl
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholderText}
				as={textarea ? 'textarea' : 'input'}
				type={type}
			/>
		</Form.Group>
	);
}

export default MyInput;
