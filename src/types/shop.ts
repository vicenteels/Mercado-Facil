export type DeliveryType = 'Entrega' | 'Retirada';
export type PaymentMethod = 'Cartão de crédito' | 'Cartão de débito' | 'Pix' | 'Dinheiro';
export type Address = { street: string; number: string; neighborhood: string; city: string; complement: string };
export type CartItem = { productId: string; quantity: number };
export type OrderItem = CartItem & { name: string; unit: string; unitPrice: number };
export type Order = {
  id: string; createdAt: string; items: OrderItem[]; itemCount: number;
  subtotal: number; fee: number; total: number; delivery: DeliveryType;
  address: Address | null; payment: PaymentMethod; status: 'Confirmado';
};
export const formatAddress = (address: Address) =>
  `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city}${address.complement ? ` (${address.complement})` : ''}`;
