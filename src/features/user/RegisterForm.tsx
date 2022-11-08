import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import FormInput from '../../components/FormInput';
import { registerSchema, defaultValues } from '../../validation/registerSchema';
import { useAddUserMutation } from '../user/userApiSlice';
import { MainButton } from '../../components/Button';

const RegisterForm = () => {
	const navigate = useNavigate();
	const methods = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues,
	});

	const [register] = useAddUserMutation();

	const submitHandler = async ({
		name,
		email,
		password,
	}: {
		name: string;
		email: string;
		password: string;
	}) => {
		const id = toast.loading('Register...', {
			theme: 'light',
		});
		try {
			await register({ name, email, password }).unwrap();

			toast.update(id, {
				render: 'Register Success',
				type: 'success',
				isLoading: false,
				hideProgressBar: true,
				autoClose: 1000,
				theme: 'light',
			});
			navigate('/login');
		} catch (e) {
			toast.update(id, {
				render: 'Register Fail',
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
				<FormInput label="Name" type="text" name="name" id="name" required />

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

				<FormInput
					label="Password confirm"
					type="password"
					name="passwordConfirm"
					id="passwordConfirm"
					required
				/>
				<MainButton>Register</MainButton>
			</form>
		</FormProvider>
	);
};

export default RegisterForm;
