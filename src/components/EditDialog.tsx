import * as Dialog from '@radix-ui/react-dialog';
import { FaEdit } from 'react-icons/fa';
import { keyframes } from '@stitches/react';

import { styled } from '../../stitches.config';
import Button from './Button';
import EditProduct from '../screens/EditProduct';
import { ReactNode } from 'react';

type Props = {
	title: string;
	children: ReactNode;
	open: boolean;
	toggleModal: () => void;
};

const overlayShow = keyframes({
	from: {
		opacity: 0,
	},
	to: {
		opacity: 1,
	},
});

const contentShow = keyframes({
	from: {
		opacity: 0,
		transform: 'translate(-50%, -48%) scale(0.96)',
	},
	to: {
		opacity: 1,
		transform: 'translate(-50%, -50%) scale(1)',
	},
});

const Overlay = styled(Dialog.Overlay, {
	backgroundColor: '#0000007d',
	position: 'fixed',
	inset: 0,
	animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

const Content = styled(Dialog.Content, {
	backgroundColor: '$light',
	borderRadius: '6px',
	boxShadow:
		'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90vw',
	maxWidth: '500px',
	maxHeight: '85vh',
	padding: '25px',
	animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,

	'&:focus': {
		outline: 'none',
	},
});

const Title = styled(Dialog.Title, {
	margin: 0,
	fontSize: '17px',
	fontWeight: 'bold',
	color: '$main_dark',
	mb: '10px',
});

const ButtonContainer = styled('div', {
	display: 'flex',
	gap: 25,
	justifyContent: 'flex-end',
});

const EditIcon = styled(FaEdit, {
	height: '20px',
	width: '20px',
	color: '$main',
});

const EditButton = styled(Button, {
	padding: '0.5rem',
});

const IconButton = styled('button', {
	borderRadius: '100%',
	height: '25px',
	width: '25px',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: '$main_dark',
	position: 'absolute',
	top: '10px',
	right: '10px',
	cursor: 'pointer',
	border: 'none',

	'&:hover': {
		backgroundColor: 'LightGray',
	},
});

const EditDialog = ({ title, children, open, toggleModal }: Props) => {
	return (
		<Dialog.Root open={open} onOpenChange={toggleModal}>
			<Dialog.Trigger asChild>
				<EditButton>
					<EditIcon />
				</EditButton>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Overlay />
				<Content>
					<Title>{title}</Title>
					{children}
					<ButtonContainer>
						<Dialog.Close asChild>
							<IconButton aria-label="Close">x</IconButton>
						</Dialog.Close>
					</ButtonContainer>
				</Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default EditDialog;
