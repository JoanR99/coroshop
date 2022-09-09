import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { useAddReviewMutation } from './reviewApiSlice';
import {
	addReviewSchema,
	defaultValues,
} from '../../validation/addReviewSchema';
import FormInput from '../../components/FormInput';

type Props = {
	productId: string;
};

const AddReview = ({ productId }: Props) => {
	const methods = useForm({
		resolver: zodResolver(addReviewSchema),
		defaultValues,
	});
	const [addReview] = useAddReviewMutation();

	const submitHandler = async ({
		comment,
		rating,
	}: {
		comment: string;
		rating: number;
	}) => {
		const id = toast.loading('Adding review...', { theme: 'dark' });
		try {
			await addReview({ productId, comment, rating: Number(rating) }).unwrap();

			toast.update(id, {
				render: 'Add review success',
				type: 'success',
				isLoading: false,
				autoClose: 3000,
				theme: 'dark',
			});
		} catch (e) {
			toast.update(id, {
				render: 'Add review Fail',
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
			<h1>Add review</h1>

			<form
				onSubmit={methods.handleSubmit(submitHandler)}
				noValidate
				autoComplete="off"
			>
				<FormInput
					type="string"
					label="Add comment"
					name="comment"
					id="comment"
					required
				/>
				<FormInput
					type="number"
					label="Rating"
					name="rating"
					id="rating"
					required
				/>

				<button>Add Review</button>
			</form>
		</FormProvider>
	);
};

export default AddReview;
