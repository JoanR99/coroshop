import { Outlet } from 'react-router-dom';
import { Container } from '../components/Container';
import OrdersCountCard from '../features/order/OrdersCountCard';
import ProductsCountCard from '../features/product/ProductsCountCard';
import UsersCountCard from '../features/user/UsersCountCard';
import { styled } from '../../stitches.config';

const FlexContainer = styled('div', {
	display: 'flex',
	gap: '8rem',
	minHeight: '88vh',
});
const SidebarSection = styled('section', {
	width: '22rem',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	gap: '4rem',
});

const MainSection = styled('main', {
	width: '100%',
	mt: '4rem',
});

const Admin = () => {
	return (
		<Container>
			<FlexContainer>
				<SidebarSection>
					<ProductsCountCard />
					<UsersCountCard />
					<OrdersCountCard />
				</SidebarSection>
				<MainSection>
					<Outlet />
				</MainSection>
			</FlexContainer>
		</Container>
	);
};

export default Admin;
