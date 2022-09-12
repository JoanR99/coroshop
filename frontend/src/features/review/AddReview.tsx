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
import { MainButton } from '../../components/Button';
import { useState } from 'react';
import { Heading3 } from '../../components/Typography';

type Props = {
	productId: string;
};

const Container = styled.div`
	width: 60%;
	margin: auto;
	margin-top: 4rem;
	margin-bottom: 4rem;
	border-top: solid 1rem #a8dadc;
	border-radius: 1rem;
	padding: 2rem;
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
`;

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
		console.log(rate / 20);
	};

	const submitHandler = async ({ comment }: { comment: string }) => {
		const id = toast.loading('Adding review...', { theme: 'light' });
		try {
			await addReview({
				productId,
				comment,
				rating: Number(rating / 20),
			}).unwrap();

			toast.update(id, {
				render: 'Add review success',
				type: 'success',
				isLoading: false,
				autoClose: 3000,
				theme: 'light',
			});
		} catch (e) {
			toast.update(id, {
				render: 'Add review Fail',
				type: 'error',
				isLoading: false,
				autoClose: 3000,
				theme: 'light',
			});
			console.log(e);
		}
	};

	return (
		<Container>
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

					<MainButton>Add Review</MainButton>
				</form>
			</FormProvider>
		</Container>
	);
};

export default AddReview;
