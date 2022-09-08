import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogoutMutation } from './authApiSlice';
import { clearCredentials } from './authSlice';

const LogoutButton = () => {
	const [logout] = useLogoutMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClick = async () => {
		const id = toast.loading('Login In...', { theme: 'dark' });
		try {
			await logout(null);
			dispatch(clearCredentials());

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

	return <button onClick={handleClick}>Logout</button>;
};

export default LogoutButton;
