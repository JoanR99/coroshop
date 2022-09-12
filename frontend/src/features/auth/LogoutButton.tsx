import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogoutMutation } from './authApiSlice';
import { clearCredentials } from './authSlice';
import styled from 'styled-components';

const Button = styled.button`
	border: none;
	font-size: 1.6rem;
	font-weight: bold;
	cursor: pointer;

	color: #1d3557;

	&:hover {
		color: #e63946;
	}
`;

const LogoutButton = () => {
	const [logout] = useLogoutMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClick = async () => {
		const id = toast.loading('Login In...', { theme: 'dark' });
		try {
			await logout(null);
			dispatch(clearCredentials());
			localStorage.setItem('persist', JSON.stringify(false));

			toast.update(id, {
				render: 'Logout Success',
				type: 'success',
				isLoading: false,
				autoClose: 3000,
				theme: 'dark',
			});
			navigate('/');
		} catch (e) {
			toast.update(id, {
				render: 'Login Fail',
				type: 'error',
				isLoading: false,
				autoClose: 3000,
				theme: 'dark',
			});
			console.log(e);
		}
	};

	return <Button onClick={handleClick}>Logout</Button>;
};

export default LogoutButton;
