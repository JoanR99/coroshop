import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './screens/Home';
import ProductScreen from './screens/ProductScreen';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/" element={<Home />} />
				<Route path="product/:id" element={<ProductScreen />} />
			</Route>
		</Routes>
	);
}

export default App;
