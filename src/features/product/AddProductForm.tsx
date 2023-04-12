import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import {
	addProductSchema,
	defaultValues,
} from '../../validation/addProductSchema';
import FormInput from '../../components/FormInput';
import { useAddProductMutation } from './productApiSlice';
import Button from '../../components/Button';

type Props = {
	closeModal: () => void;
};

const AddProductForm = ({ closeModal }: Props) => {
	const methods = useForm({
		resolver: zodResolver(addProductSchema),
		defaultValues,
	});

	const [addProduct, { isLoading }] = useAddProductMutation();

	const submitHandler = async ({
		name,
		price,
		image,
		brand,
		category,
		description,
		countInStock,
	}: {
		name: string;
		price: string;
		image: string;
		brand: string;
		category: string;
		description: string;
		countInStock: string;
	}) => {
		const id = toast.loading('Adding product...', { theme: 'light' });
		try {
			await addProduct({
				name,
				price: Number(price),
				image,
				brand,
				category,
				description,
				countInStock: Number(countInStock),
			}).unwrap();

			toast.update(id, {
				render: 'Add product Success',
				type: 'success',
				isLoading: false,
				hideProgressBar: true,
				autoClose: 1000,
				theme: 'light',
			});
			closeModal();
		} catch (e) {
			toast.update(id, {
				render: 'Add product Fail',
				type: 'error',
				isLoading: false,
				hideProgressBar: true,
				autoClose: 1000,
				theme: 'light',
			});
			console.log(e);
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
					label="Price"
					type="number"
					name="price"
					id="price"
					required
				/>

				<FormInput
					label="Image url"
					type="text"
					name="image"
					id="image"
					required
				/>

				<FormInput label="Brand" type="text" name="brand" id="brand" required />

				<FormInput
					label="Category"
					type="text"
					name="category"
					id="category"
					required
				/>

				<FormInput
					label="Description"
					type="text"
					name="description"
					id="description"
					required
				/>

				<FormInput
					label="Count in stock"
					type="number"
					name="countInStock"
					id="countInStock"
					required
				/>

				<Button
					variant="main"
					size={{
						'@initial': 'small',
						'@md': 'normal',
					}}
					fontSize="1"
					disabled={isLoading}
				>
					Add Product
				</Button>
			</form>
		</FormProvider>
	);
};

export default AddProductForm;
