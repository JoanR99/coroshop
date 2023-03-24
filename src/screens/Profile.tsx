import { Container, StyledContainer } from '../components/Container';
import { Heading2, Heading3 } from '../components/Typography';
import UpdateUserForm from '../features/user/UpdateUserForm';
import OrdersTable from '../features/order/OrdersTable';
import { useGetUserOrdersQuery } from '../features/order/orderApiSlice';
import Spinner from '../components/Spinner';
import { styled } from '../../stitches.config';

const Heading = styled(Heading2, {
	mt: '2rem',
});

const FormSection = styled(StyledContainer, {
	width: '28%',
});
const TableSection = styled(StyledContainer, {
	width: '68%',
});

const Profile = () => {
	const { data, isLoading } = useGetUserOrdersQuery(null);

	return isLoading ? (
		<Spinner />
	) : (
		<Container>
			<Heading>Profile</Heading>
			<Container>
				<FormSection>
					<Heading3>Update Profile</Heading3>
					<UpdateUserForm />
				</FormSection>
				<TableSection>
					<Heading3>Orders</Heading3>
					<OrdersTable orders={data!.getUserOrders} />
				</TableSection>
			</Container>
		</Container>
	);
};

export default Profile;
