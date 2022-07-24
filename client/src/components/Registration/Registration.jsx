import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import MyInput from '../../common/Input/MyInput';
import MyButton from '../../common/MyButton/MyButton';
import AuthService from '../../services/AuthService';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../routeConstants';

function Registration() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const navigate = useNavigate();

	const submit = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords do not match');
		}

		if (name === '' || email === '' || password === '') {
			alert('All fields are required');
			return;
		}

		AuthService.registration({
			name,
			email,
			password,
		}).then((isSuccess) => {
			if (isSuccess) {
				alert("You've successfully registered!");
				navigate(LOGIN_ROUTE);
			}
		});
	};

	return (
		<div
			className='d-flex justify-content-center align-items-center'
			style={{ height: '80vh' }}
		>
			<div className='col-lg-5 col-md-7 col-sm-10 p-3 border'>
				<h4 className='text-center'>Registration</h4>
				<Form className='d-flex flex-column mb-3' onSubmit={submit}>
					<MyInput
						className='mb-3'
						labelText='Name'
						placeholderText='Enter name'
						value={name}
						onChange={setName}
					/>
					<MyInput
						className='mb-3'
						labelText='Email'
						placeholderText='Enter email'
						value={email}
						onChange={setEmail}
						type='email'
					/>
					<MyInput
						className='mb-3'
						labelText='Password'
						placeholderText='Enter password'
						value={password}
						onChange={setPassword}
						type='password'
					/>
					<MyInput
						className='mb-3'
						labelText='Password'
						placeholderText='Enter password'
						value={confirmPassword}
						onChange={setConfirmPassword}
						type='password'
					/>
					<MyButton
						className='align-self-center'
						buttonText='Registration'
						type='submit'
					/>
				</Form>
				<p className='text-center m-0'>
					If you have an account, you can <Link to='/login'>Login</Link>
				</p>
			</div>
		</div>
	);
}

export default Registration;
