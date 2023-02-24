import { StyledContainer } from '../components/Container';
import LoginForm from '../features/auth/LoginForm';
import img from '../assets/images/login.jpg';
import { AuthSection, FormSection, MarginHeading } from '../components/Section';
import { styled } from '../../stitches.config';

const FormContainer = styled(StyledContainer, {
	backgroundColor: '#f2f2f2f2',
	width: '50rem',
});

export const SectionImage = styled('div', {
	width: '48%',
	height: '100%',
	backgroundImage: `linear-gradient(
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
	url(${img})`,
	backgroundSize: 'cover',
});

const Login = () => (
	<AuthSection>
		<SectionImage />
		<FormSection>
			<FormContainer>
				<MarginHeading>Login</MarginHeading>
				<LoginForm />
			</FormContainer>
		</FormSection>
	</AuthSection>
);

export default Login;
