import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import MyInput from '../../common/Input/MyInput';
import MyButton from '../../common/MyButton/MyButton';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { COURSES_ROUTE } from '../../routeConstants';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/user/actionCreators';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const submit = (e) => {
		e.preventDefault();

		AuthService.login({ email, password }).then((user) => {
			dispatch(setUser(user));
			navigate(COURSES_ROUTE);
		});
	};

	return (
		<div
			className='d-flex justify-content-center align-items-center'
			style={{ height: '80vh' }}
		>
			<div className='col-lg-5 col-md-7 col-sm-10 p-3 border'>
				<h4 className='text-center'>Login</h4>
				<Form className='d-flex flex-column mb-3' onSubmit={submit}>
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
					<MyButton
						className='align-self-center'
						buttonText='Login'
						type='submit'
					/>
				</Form>
				<p className='text-center m-0'>
					If you don't have an account, you can{' '}
					<Link to='/registration'>Register</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
