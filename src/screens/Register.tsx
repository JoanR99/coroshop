import { Container, StyledContainer } from '../components/Container';
import img from '../assets/images/login.jpg';
import RegisterForm from '../features/user/RegisterForm';
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

const Register = () => (
	<AuthSection>
		<SectionImage img={img} />
		<FormSection>
			<FormContainer>
				<MarginHeading>Register</MarginHeading>
				<RegisterForm />
			</FormContainer>
		</FormSection>
	</AuthSection>
);

export default Register;
