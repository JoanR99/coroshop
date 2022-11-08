import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import {
	addProductSchema,
	defaultValues,
} from '../validation/addProductSchema';
import FormInput from '../components/FormInput';
import {
	useGetProductQuery,
	useUpdateProductMutation,
} from '../features/product/productApiSlice';
import { MarginContainer } from '../components/Container';
import { MainButton } from '../components/Button';
import { Heading2 } from '../components/Typography';

const EditProduct = () => {
	const navigate = useNavigate();
	const params = useParams();

	const productId = params.id!;

	const { data, isLoading } = useGetProductQuery({ productId });

	useEffect(() => {
		if (data?.getProduct) {
			methods.reset({
				name: data!.getProduct.name,
				price: String(data!.getProduct.price),
				image: data!.getProduct.image,
				brand: data!.getProduct.brand,
				category: data!.getProduct.category,
				description: data!.getProduct.description,
				countInStock: String(data!.getProduct.countInStock),
			});
		}
	}, [data?.getProduct]);

	const methods = useForm({
		resolver: zodResolver(addProductSchema),
		defaultValues,
	});

	const [updateProduct, { isLoading: updateLoading }] =
		useUpdateProductMutation();

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
		const id = toast.loading('Updating product...', { theme: 'light' });
		try {
			await updateProduct({
				productBody: {
					name,
					price: Number(price),
					image,
					brand,
					category,
					description,
					countInStock: Number(countInStock),
				},
				productId,
			}).unwrap();

			toast.update(id, {
				render: 'Update product Success',
				type: 'success',
				isLoading: false,
				hideProgressBar: true,
				autoClose: 1000,
				theme: 'light',
			});
			navigate('/admin/product-list');
		} catch (e) {
			toast.update(id, {
				render: 'Update product Fail',
				type: 'error',
				isLoading: false,
				hideProgressBar: true,
				autoClose: 1000,
				theme: 'light',
			});
		}
	};

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<MarginContainer>
			<FormProvider {...methods}>
				<Heading2>Update product</Heading2>

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

					<FormInput
						label="Brand"
						type="text"
						name="brand"
						id="brand"
						required
					/>

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

					<MainButton disabled={updateLoading}>Update Product</MainButton>
				</form>
			</FormProvider>
		</MarginContainer>
	);
};

export default EditProduct;
