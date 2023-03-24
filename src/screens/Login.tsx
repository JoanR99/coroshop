import { StyledContainer } from '../components/Container';
import LoginForm from '../features/auth/LoginForm';
import img from '../assets/images/login.jpg';
import { FlexSection } from '../components/Section';
import { styled } from '../../stitches.config';
import { Heading3 } from '../components/Typography';
import { Box } from '../components/Box';

const FormContainer = styled(StyledContainer, {
	backgroundColor: '#f2f2f2f2',
});

export const SectionImage = styled('div', {
	variants: {
		size: {
			half: {
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
			},
			full: {
				width: '100%',
				height: '100%',
				backgroundBlendMode: 'only screen',
				backgroundImage: `linear-gradient(
					to right,
					rgba(168, 218, 220, 0.7),
					rgba(168, 218, 220, 0.7)
				),
				url(${img})`,
				backgroundSize: 'cover',
			},
		},
	},
});

const Login = () => (
	<FlexSection
		justify="between"
		align="center"
		css={{
			backgroundColor: '$main_light',
			height: '90vh',
			'@lg': { height: '87vh' },
		}}
	>
		<SectionImage
			size={{
				'@initial': 'full',
				'@lg': 'half',
			}}
		/>
		<Box
			css={{
				position: 'absolute',
				width: '100%',
				'@lg': {
					position: 'unset',
					backgroundColor: '$main_light',
					height: '100%',
					display: 'grid',
					placeItems: 'center',
					width: '48%',
				},
			}}
		>
			<FormContainer css={{ width: '80%', m: 'auto', '@lg': { width: '70%' } }}>
				<Heading3
					size={{
						'@initial': '2',
						'@md': '3',
					}}
				>
					Login
				</Heading3>
				<LoginForm />
			</FormContainer>
		</Box>
	</FlexSection>
);

export default Login;
