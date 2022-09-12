import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { loginSchema, defaultValues } from '../../validation/loginSchema';
import FormInput from '../../components/FormInput';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { setCredentials } from '../../features/auth/authSlice';
import CheckboxInput from '../../components/CheckboxInput';
import { MainButton } from '../../components/Button';

const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const methods = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues,
	});

	const [login] = useLoginMutation();

	const submitHandler = async ({
		email,
		password,
		persist,
	}: {
		email: string;
		password: string;
		persist: boolean;
	}) => {
		const id = toast.loading('Login In...', { theme: 'light' });
		try {
			const userData = await login({ email, password }).unwrap();

			if (userData?.login) {
				dispatch(setCredentials({ accessToken: userData?.login.accessToken }));
				localStorage.setItem('persist', JSON.stringify(persist));
				toast.update(id, {
					render: 'Login Success',
					type: 'success',
					isLoading: false,
					autoClose: 3000,
					theme: 'light',
				});
				navigate('/');
			}
		} catch (e) {
			toast.update(id, {
				render: 'Login Fail',
				type: 'error',
				isLoading: false,
				autoClose: 3000,
				theme: 'light',
			});
			console.log(e);
		}
	};

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(submitHandler)}
				noValidate
				autoComplete="off"
			>
				<FormInput
					label="Email"
					type="email"
					name="email"
					id="email"
					required
				/>
				<FormInput
					label="Password"
					type="password"
					name="password"
					id="password"
					required
				/>

				<CheckboxInput
					label="Trust this device?"
					name="persist"
					id="persist"
					required
				/>

				<MainButton>Login</MainButton>
			</form>
		</FormProvider>
	);
};

export default LoginForm;
