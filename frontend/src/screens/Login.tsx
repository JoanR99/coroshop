import styled from 'styled-components';
import { Container } from '../components/Container';
import {
	SectionContainer,
	SectionPartImage,
	SectionPartText,
} from '../components/Section';
import LoginForm from '../features/auth/LoginForm';
import img from '../assets/images/login.jpg';
import { Heading2 } from '../components/Typography';

const Section = styled(SectionContainer)`
	background-color: #a8dadc;
	height: 86vh;
`;

const FormSection = styled(SectionPartText)`
	background-color: #a8dadc;
	height: 100%;
	display: grid;
	place-items: center;
`;

const SectionImage = styled(SectionPartImage)`
	background-image: linear-gradient(
			to right,
			rgba(102, 212, 82, 0),
			rgba(33, 175, 128, 0),
			rgba(33, 175, 128, 0),
			rgba(33, 175, 128, 0),
			rgba(33, 175, 128, 0),
			rgba(33, 175, 128, 0),
			rgba(168, 218, 220, 0.9),
			rgba(168, 218, 220, 1)
		),
		url(${img});
	background-size: cover;
`;

const MarginHeading = styled(Heading2)`
	margin-bottom: 2rem;
`;

const Login = () => (
	<Section>
		<SectionImage />
		<FormSection>
			<Container>
				<MarginHeading>Login</MarginHeading>
				<LoginForm />
			</Container>
		</FormSection>
	</Section>
);

export default Login;
