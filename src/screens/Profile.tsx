import styled from 'styled-components';

import {
	Container,
	FlexContainer,
	StyledContainer,
} from '../components/Container';
import { Heading2, Heading3 } from '../components/Typography';
import UpdateUserForm from '../features/user/UpdateUserForm';
import OrdersTable from '../features/order/OrdersTable';
import { useGetUserOrdersQuery } from '../features/order/orderApiSlice';

const Heading = styled(Heading2)`
	margin-top: 2rem;
`;

const FlexSection = styled(FlexContainer)`
	margin-top: 2rem;
`;

const FormSection = styled(StyledContainer)`
	width: 28%;
`;
const TableSection = styled(StyledContainer)`
	width: 68%;
`;

const Profile = () => {
	const { data, isLoading } = useGetUserOrdersQuery(null);

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<Container>
			<Heading>Profile</Heading>
			<FlexSection>
				<FormSection>
					<Heading3>Update Profile</Heading3>
					<UpdateUserForm />
				</FormSection>
				<TableSection>
					<Heading3>Orders</Heading3>
					<OrdersTable orders={data!.getUserOrders} />
				</TableSection>
			</FlexSection>
		</Container>
	);
};

export default Profile;
