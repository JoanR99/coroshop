import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../components/Container';
import OrdersCountCard from '../features/order/OrdersCountCard';
import ProductsCountCard from '../features/product/ProductsCountCard';
import UsersCountCard from '../features/user/UsersCountCard';

const FlexContainer = styled.div`
	display: flex;
	gap: 8rem;
	min-height: 88vh;
`;

const SidebarSection = styled.section`
	width: 22rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 4rem;
`;

const MainSection = styled.main`
	width: 100%;
	margin-top: 4rem;
`;

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
