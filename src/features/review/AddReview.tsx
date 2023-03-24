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
import Button from '../../components/Button';
import { useState } from 'react';
import { Heading3 } from '../../components/Typography';
import { StyledContainer } from '../../components/Container';
import { styled } from '../../../stitches.config';

type Props = {
	productId: string;
};

const Input = styled(FormInput, {
	width: '100%',
});

const StarsRating = styled(Rating, {
	mb: '1rem',
});

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
		<StyledContainer css={{ mx: 'auto', my: '8rem', '@lg': { width: '40vw' } }}>
			<Heading3
				css={{ mb: '2rem' }}
				size={{
					'@initial': '2',
					'@md': '3',
				}}
			>
				Add Review
			</Heading3>
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

					<Button
						variant="main"
						size={{
							'@initial': 'small',
							'@lg': 'normal',
						}}
						fontSize={{
							'@initial': '1',
							'@lg': '2',
						}}
					>
						Add Review
					</Button>
				</form>
			</FormProvider>
		</StyledContainer>
	);
};

export default AddReview;
