import { Container } from '../components/Container';
import img from '../assets/images/login.jpg';
import RegisterForm from '../features/user/RegisterForm';
import {
	AuthSection,
	SectionImage,
	FormSection,
	MarginHeading,
} from '../components/Section';

const Register = () => (
	<AuthSection>
		<SectionImage img={img} />
		<FormSection>
			<Container>
				<MarginHeading>Register</MarginHeading>
				<RegisterForm />
			</Container>
		</FormSection>
	</AuthSection>
);

export default Register;
