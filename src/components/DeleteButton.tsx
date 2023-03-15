import { MdDelete } from 'react-icons/md';
import { styled } from '../../stitches.config';
import Button from './Button';

const DeleteIcon = styled(MdDelete, {
	height: '20px',
	width: '20px',
	color: '$action',
});

const DeleteButtonContainer = styled(Button, {
	padding: '0.5rem',
});

const DeleteButton = () => (
	<DeleteButtonContainer>
		<DeleteIcon />
	</DeleteButtonContainer>
);

export default DeleteButton;
