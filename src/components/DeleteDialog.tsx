import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { MdDelete } from 'react-icons/md';
import Button from './Button';
import { styled } from '../../stitches.config';
import { keyframes } from '@stitches/react';

type Props = {
	deleteHandler: () => Promise<void>;
	loading: boolean;
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

const Overlay = styled(AlertDialog.Overlay, {
	backgroundColor: '#0000007d',
	position: 'fixed',
	inset: 0,
	animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

const Content = styled(AlertDialog.Content, {
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

const Title = styled(AlertDialog.Title, {
	margin: 0,
	fontSize: '17px',
	fontWeight: 'bold',
	color: '$main_dark',
	mb: '10px',
});

const Description = styled(AlertDialog.Description, {
	fontSize: '15px',
	color: '$main_dark',
	mb: '20px',
	lineHeight: '1.5',
});

const ButtonContainer = styled('div', {
	display: 'flex',
	gap: 25,
	justifyContent: 'flex-end',
});

const DeleteIcon = styled(MdDelete, {
	height: '20px',
	width: '20px',
	color: '$action',
});

const DeleteButton = styled(Button, {
	padding: '0.5rem',
});

const DeleteDialog = ({ deleteHandler, loading }: Props) => {
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger asChild>
				<DeleteButton>
					<DeleteIcon />
				</DeleteButton>
			</AlertDialog.Trigger>
			<AlertDialog.Portal>
				<Overlay />
				<Content>
					<Title>Are you absolutely sure?</Title>
					<Description>
						This action cannot be undone. This will permanently delete the data
						from the servers.
					</Description>
					<ButtonContainer>
						<AlertDialog.Cancel asChild>
							<Button variant="ghost">Cancel</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<Button
								variant="main"
								onClick={() => deleteHandler()}
								disabled={loading}
							>
								Delete
							</Button>
						</AlertDialog.Action>
					</ButtonContainer>
				</Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};

export default DeleteDialog;
