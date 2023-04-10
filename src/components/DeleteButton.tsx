import { MdDelete } from 'react-icons/md';
import { styled } from '../../stitches.config';
import Button from './Button';

const DeleteIcon = styled(MdDelete, {
	height: '20px',
	width: '20px',
	color: '$action',
});

const DeleteButton = () => (
	<Button variant="main" size="small" fontSize="1">
		<DeleteIcon color="white" />
	</Button>
);

export default DeleteButton;
