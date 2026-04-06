import { Furniture } from '../types/furniture/furniture';

const CART_KEY = 'monolith_cart';

export interface CartItem {
	_id: string;
	furnitureTitle: string;
	furniturePrice: number;
	furnitureLastChancePrice?: number;
	furnitureImages: string[];
	furnitureStatus: string;
	furnitureDiscount?: number;
	quantity: number;
}

export const getCartItems = (): CartItem[] => {
	if (typeof window === 'undefined') return [];
	try {
		const raw = localStorage.getItem(CART_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
};

export const saveCartItems = (items: CartItem[]): void => {
	if (typeof window === 'undefined') return;
	localStorage.setItem(CART_KEY, JSON.stringify(items));
	window.dispatchEvent(new Event('cartUpdated'));
};

export const addToCart = (furniture: Furniture, qty: number = 1): void => {
	const items = getCartItems();
	const existing = items.find((i) => i._id === furniture._id);
	if (existing) {
		existing.quantity += qty;
	} else {
		items.push({
			_id: furniture._id,
			furnitureTitle: furniture.furnitureTitle,
			furniturePrice: furniture.furniturePrice,
			furnitureLastChancePrice: furniture.furnitureLastChancePrice,
			furnitureImages: furniture.furnitureImages ?? [],
			furnitureStatus: furniture.furnitureStatus,
			furnitureDiscount: furniture.furnitureDiscount,
			quantity: qty,
		});
	}
	saveCartItems(items);
};

export const removeFromCart = (id: string): CartItem[] => {
	const updated = getCartItems().filter((i) => i._id !== id);
	saveCartItems(updated);
	return updated;
};

export const updateCartQuantity = (id: string, quantity: number): CartItem[] => {
	const updated = getCartItems().map((i) => (i._id === id ? { ...i, quantity: Math.max(1, quantity) } : i));
	saveCartItems(updated);
	return updated;
};

export const getCartCount = (): number => {
	return getCartItems().reduce((sum, i) => sum + i.quantity, 0);
};
