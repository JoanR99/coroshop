import { FaEdit } from 'react-icons/fa';
import { styled } from '../../stitches.config';
import Button from './Button';

const EditIcon = styled(FaEdit, {
	height: '20px',
	width: '20px',
	color: '$main',
});

const EditButton = () => (
	<Button
		variant="edit"
		size={{
			'@initial': 'small',
			'@md': 'normal',
		}}
		fontSize="1"
	>
		<EditIcon color="black" />
	</Button>
);

export default EditButton;
