import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { Rating } from 'react-simple-star-rating';

import { useAddReviewMutation } from './reviewApiSlice';
import {
	addReviewSchema,
	defaultValues,
} from '../../validation/addReviewSchema';
import FormInput from '../../components/FormInput';
import styled from 'styled-components';
import Button from '../../components/Button';
import { useState } from 'react';
import { Heading3 } from '../../components/Typography';
import { MarginContainer } from '../../components/Container';

type Props = {
	productId: string;
};

const Input = styled(FormInput)`
	width: 100%;
`;

const Heading = styled(Heading3)`
	margin-bottom: 2rem;
`;

const StarsRating = styled(Rating)`
	margin-bottom: 1rem;
`;

const AddReview = ({ productId }: Props) => {
	const [rating, setRating] = useState(0);
	const methods = useForm({
		resolver: zodResolver(addReviewSchema),
		defaultValues,
	});
	const [addReview] = useAddReviewMutation();

	const handleRating = (rate: number) => {
		setRating(rate);
	};

	const submitHandler = async ({ comment }: { comment: string }) => {
		const id = toast.loading('Adding review...', {
			theme: 'light',
		});
		try {
			await addReview({
				productId,
				comment,
				rating: Number(rating / 20),
			}).unwrap();

			setRating(0);

			toast.update(id, {
				render: 'Add review success',
				type: 'success',
				isLoading: false,
				hideProgressBar: true,
				autoClose: 1000,
				theme: 'light',
			});
			methods.reset();
		} catch (e) {
			toast.update(id, {
				render: (e as { message: string }).message.split(':')[0],
				type: 'error',
				isLoading: false,
				hideProgressBar: true,
				autoClose: 1000,
				theme: 'light',
			});
		}
	};

	return (
		<MarginContainer>
			<Heading>Add Review</Heading>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(submitHandler)}
					noValidate
					autoComplete="off"
				>
					<StarsRating ratingValue={rating} onClick={handleRating} size={30} />

					<Input
						type="string"
						label="Add comment"
						name="comment"
						id="comment"
						required
					/>

					<Button variant="main">Add Review</Button>
				</form>
			</FormProvider>
		</MarginContainer>
	);
};

export default AddReview;
