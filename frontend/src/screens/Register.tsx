import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import FormInput from '../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { registerSchema, defaultValues } from '../validation/registerSchema';
import { useAddUserMutation } from '../features/user/userApiSlice';

const Register = () => {
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
		const id = toast.loading('Register...', { theme: 'dark' });
		try {
			await register({ name, email, password }).unwrap();

			toast.update(id, {
				render: 'Register Success',
				type: 'success',
				isLoading: false,
				autoClose: 3000,
				theme: 'dark',
			});
			navigate('/login');
		} catch (e) {
			toast.update(id, {
				render: 'Register Fail',
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
			<h1>Register</h1>

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
				<button>Register</button>
			</form>
		</FormProvider>
	);
};

export default Register;
