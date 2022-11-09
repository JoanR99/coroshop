import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import {
	updateUserSchema,
	defaultValues,
} from '../validation/updateUserSchema';
import FormInput from '../components/FormInput';
import CheckboxInput from '../components/CheckboxInput';
import { MainButton } from '../components/Button';
import {
	useGetUserQuery,
	useUpdateUserMutation,
} from '../features/user/userApiSlice';
import { MarginContainer } from '../components/Container';
import { Heading2 } from '../components/Typography';
import Spinner from '../components/Spinner';

const EditUser = () => {
	const navigate = useNavigate();
	const methods = useForm({
		resolver: zodResolver(updateUserSchema),
		defaultValues,
	});

	const params = useParams();

	const userId = params.id!;

	const { data, isLoading } = useGetUserQuery({ userId });

	useEffect(() => {
		if (data?.getUser) {
			methods.reset({
				name: data!.getUser.name,
				email: data!.getUser.email,
				isAdmin: data!.getUser.isAdmin,
			});
		}
	}, [data?.getUser]);

	const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

	const submitHandler = async ({
		name,
		email,
		isAdmin,
	}: {
		name: string;
		email: string;
		isAdmin: boolean;
	}) => {
		const id = toast.loading('Updating user', { theme: 'light' });
		try {
			await updateUser({
				updateBody: { name, email, isAdmin },
				userId,
			}).unwrap();

			toast.update(id, {
				render: 'Update Success',
				type: 'success',
				isLoading: false,
				hideProgressBar: true,
				autoClose: 1000,
				theme: 'light',
			});
			navigate('/admin/user-list');
		} catch (e) {
			toast.update(id, {
				render: 'Update Fail',
				type: 'error',
				isLoading: false,
				hideProgressBar: true,
				autoClose: 1000,
				theme: 'light',
			});
			console.log(e);
		}
	};

	return isLoading ? (
		<Spinner />
	) : (
		<MarginContainer>
			<FormProvider {...methods}>
				<Heading2>Update User</Heading2>
				<form
					onSubmit={methods.handleSubmit(submitHandler)}
					noValidate
					autoComplete="off"
				>
					<FormInput label="Name" type="name" name="name" id="text" required />

					<FormInput
						label="Email"
						type="email"
						name="email"
						id="email"
						required
					/>

					<CheckboxInput
						label="Is an Administrator?"
						name="isAdmin"
						id="isAdmin"
						required
					/>

					<MainButton disabled={updateLoading}>Update User</MainButton>
				</form>
			</FormProvider>
		</MarginContainer>
	);
};

export default EditUser;
