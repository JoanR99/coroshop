import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import {
	updateUserSchema,
	defaultValues,
} from '../../validation/updateUserSchema';
import FormInput from '../../components/FormInput';
import CheckboxInput from '../../components/CheckboxInput';
import Button from '../../components/Button';
import { useGetUserQuery, useUpdateUserMutation } from './userApiSlice';
import Spinner from '../../components/Spinner';

type Props = {
	userId: string;
	closeModal: () => void;
};

const EditUserForm = ({ userId, closeModal }: Props) => {
	const methods = useForm({
		resolver: zodResolver(updateUserSchema),
		defaultValues,
	});

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
			closeModal();
		} catch (e) {
			toast.update(id, {
				render: 'Update Fail',
				type: 'error',
				isLoading: false,
				hideProgressBar: true,
				autoClose: 1000,
				theme: 'light',
			});
			closeModal();
			console.log(e);
		}
	};

	return isLoading ? (
		<Spinner />
	) : (
		<FormProvider {...methods}>
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

				<Button variant="add" disabled={updateLoading}>
					Update User
				</Button>
			</form>
		</FormProvider>
	);
};

export default EditUserForm;
