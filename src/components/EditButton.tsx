import { FaEdit } from 'react-icons/fa';
import { styled } from '../../stitches.config';
import Button from './Button';

const EditIcon = styled(FaEdit, {
	height: '20px',
	width: '20px',
	color: '$main',
});

const ButtonContainer = styled(Button, {
	padding: '0.5rem',
});

const EditButton = () => (
	<ButtonContainer>
		<EditIcon />
	</ButtonContainer>
);

export default EditButton;
