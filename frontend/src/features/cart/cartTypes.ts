import { Product } from '../product/productTypes';

export interface CartItem extends Product {
	quantity: number;
}

export interface ShippingAddress {
	address: string;
	city: string;
	postalCode: string;
	country: string;
}

export interface CartState {
	cartItems: CartItem[];
	cartCount: number;
	isCartOpen: boolean;
	shippingAddress: ShippingAddress;
	paymentMethod: string;
}
