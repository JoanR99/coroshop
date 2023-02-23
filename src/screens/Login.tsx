import { Container, StyledContainer } from '../components/Container';
import LoginForm from '../features/auth/LoginForm';
import img from '../assets/images/login.jpg';
import {
	AuthSection,
	SectionImage,
	FormSection,
	MarginHeading,
} from '../components/Section';
import { styled } from '../../stitches.config';

const FormContainer = styled(StyledContainer, {
	backgroundColor: '#f2f2f2f2',
	width: '50rem',
});

const Login = () => (
	<AuthSection>
		<SectionImage img={img} />
		<FormSection>
			<FormContainer>
				<MarginHeading>Login</MarginHeading>
				<LoginForm />
			</FormContainer>
		</FormSection>
	</AuthSection>
);

export default Login;
