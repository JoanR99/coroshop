import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, Location } from 'react-router-dom';

import { loginSchema, defaultValues } from '../../validation/loginSchema';
import FormInput from '../../components/FormInput';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { setCredentials } from '../../features/auth/authSlice';
import CheckboxInput from '../../components/CheckboxInput';
import { MainButton } from '../../components/Button';
import { useAppDispatch } from '../../app/hooks';

interface OwnLocation extends Location {
	state: {
		from?: {
			pathname?: string;
		};
	};
}

const LoginForm = () => {
	const dispatch = useAppDispatch();
	const location = useLocation() as OwnLocation;
	const navigate = useNavigate();
	const methods = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues,
	});

	const from = location.state?.from?.pathname || '/';

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
					hideProgressBar: true,
					autoClose: 1000,
					theme: 'light',
				});
				navigate(from, { replace: true });
			}
		} catch (e) {
			toast.update(id, {
				render: 'Login Fail',
				type: 'error',
				isLoading: false,
				hideProgressBar: true,
				autoClose: 1000,
				theme: 'light',
			});
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
