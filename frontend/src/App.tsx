import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Layout from './components/Layout';
import Home from './screens/Home';
import Login from './screens/Login';
import ProductScreen from './screens/ProductScreen';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<>
			<ToastContainer />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="product/:id" element={<ProductScreen />} />
					<Route path="login" element={<Login />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
