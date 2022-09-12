import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Layout from './components/Layout';
import Home from './screens/Home';
import Login from './screens/Login';
import ProductScreen from './screens/ProductScreen';
import 'react-toastify/dist/ReactToastify.css';
import Register from './screens/Register';
import RequireAuth from './features/auth/RequireAuth';
import RequireAdmin from './features/auth/RequireAdmin';
import PersistLogin from './features/auth/PersistLogin';
import Users from './screens/Users';
import Unauthorized from './screens/Unauthorized';
import AllProducts from './screens/AllProducts';
import AddProduct from './screens/AddProduct';

function App() {
	return (
		<>
			<ToastContainer />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route element={<PersistLogin />}>
						<Route index element={<Home />} />
						<Route path="/products" element={<AllProducts />} />
						<Route path="products/:id" element={<ProductScreen />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
						<Route path="unauthorized" element={<Unauthorized />} />

						<Route element={<RequireAuth />}>
							<Route path="admin" element={<RequireAdmin />}>
								<Route path="user-list" element={<Users />} />
								<Route path="add-product" element={<AddProduct />} />
							</Route>
						</Route>
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
