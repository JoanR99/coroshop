import { Product, ProductOverview } from '../product/productTypes';

export type CartItem = ProductOverview & { quantity: number };

export type ShippingAddress = {
	address: string;
	city: string;
	postalCode: string;
	country: string;
};

export type PaymentMethod = 'PayPal' | 'Stripe';

export interface CartState {
	cartItems: CartItem[];
	isCartOpen: boolean;
	shippingAddress: ShippingAddress;
	paymentMethod: PaymentMethod;
}
