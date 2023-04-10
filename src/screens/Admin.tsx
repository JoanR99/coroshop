import { Outlet } from 'react-router-dom';
import { Container } from '../components/Container';
import { styled } from '../../stitches.config';

const MainSection = styled('main', {
	width: '100%',
	mt: '4rem',
});

const Admin = () => {
	return (
		<Container>
			<MainSection>
				<Outlet />
			</MainSection>
		</Container>
	);
};

export default Admin;
