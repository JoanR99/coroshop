import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LinkButton } from '../../components/Button';
import { useLogoutMutation } from './authApiSlice';
import { clearCredentials } from './authSlice';

const LogoutButton = () => {
	const [logout] = useLogoutMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClick = async () => {
		const id = toast.loading('Login In...', { theme: 'light' });
		try {
			await logout(null);
			dispatch(clearCredentials());
			localStorage.setItem('persist', JSON.stringify(false));

			toast.update(id, {
				render: 'Logout Success',
				type: 'success',
				isLoading: false,
				autoClose: 3000,
				theme: 'light',
			});
			navigate('/');
		} catch (e) {
			toast.update(id, {
				render: 'Login Fail',
				type: 'error',
				isLoading: false,
				autoClose: 3000,
				theme: 'light',
			});
			console.log(e);
		}
	};

	return <LinkButton onClick={handleClick}>Logout</LinkButton>;
};

export default LogoutButton;
