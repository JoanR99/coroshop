import { Container } from '../components/Container';
import { Heading1, Paragraph } from '../components/Typography';
import { MainButton } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeading = styled(Heading1)`
	margin-top: 2rem;
	margin-bottom: 2rem;
`;

const StyledParagraph = styled(Paragraph)`
	margin-bottom: 2rem;
`;

const Unauthorized = () => {
	const navigate = useNavigate();

	const clickHandler = () => navigate('/');

	return (
		<Container>
			<StyledHeading>Unauthorized</StyledHeading>
			<StyledParagraph>
				You are not authorized to visit this page.
			</StyledParagraph>
			<MainButton onClick={clickHandler}>Go to Home</MainButton>
		</Container>
	);
};

export default Unauthorized;
