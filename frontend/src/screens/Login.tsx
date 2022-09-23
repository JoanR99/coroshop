import { Container } from '../components/Container';
import LoginForm from '../features/auth/LoginForm';
import img from '../assets/images/login.jpg';
import {
	AuthSection,
	SectionImage,
	FormSection,
	MarginHeading,
} from '../components/Section';

const Login = () => (
	<AuthSection>
		<SectionImage img={img} />
		<FormSection>
			<Container>
				<MarginHeading>Login</MarginHeading>
				<LoginForm />
			</Container>
		</FormSection>
	</AuthSection>
);

export default Login;
