import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { loginSchema, defaultValues } from '../validation/loginSchema';
import FormInput from '../components/FormInput';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
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
	}: {
		email: string;
		password: string;
	}) => {
		const id = toast.loading('Login In...', { theme: 'dark' });
		try {
			const userData = await login({ email, password }).unwrap();

			if (userData?.login) {
				dispatch(setCredentials({ accessToken: userData?.login.accessToken }));
				toast.update(id, {
					render: 'Login Success',
					type: 'success',
					isLoading: false,
					autoClose: 3000,
					theme: 'dark',
				});
				navigate('/');
			}
		} catch (e) {
			toast.update(id, {
				render: 'Login Fail',
				type: 'error',
				isLoading: false,
				autoClose: 3000,
				theme: 'dark',
			});
			console.log(e);
		}
	};

	return (
		<FormProvider {...methods}>
			<h1>Login</h1>

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
				<button>Login</button>
			</form>
		</FormProvider>
	);
};

export default Login;
