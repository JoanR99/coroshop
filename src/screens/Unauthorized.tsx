import { useNavigate } from 'react-router-dom';

import { Container } from '../components/Container';
import { Heading1, Paragraph } from '../components/Typography';
import Button from '../components/Button';
import { styled } from '../../stitches.config';

const StyledHeading = styled(Heading1, {
	my: '2rem',
});

const StyledParagraph = styled(Paragraph, {
	mb: '2rem',
});

const Unauthorized = () => {
	const navigate = useNavigate();

	const clickHandler = () => navigate('/');

	return (
		<Container>
			<StyledHeading>Unauthorized</StyledHeading>
			<StyledParagraph>
				You are not authorized to visit this page.
			</StyledParagraph>
			<Button variant="main" onClick={clickHandler}>
				Go to Home
			</Button>
		</Container>
	);
};

export default Unauthorized;
