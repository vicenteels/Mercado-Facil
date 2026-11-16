import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { products } from '../data/products';
import { Address, DeliveryType, Order, PaymentMethod } from '../types/shop';

type ShopContextValue = {
  loggedIn: boolean; login: () => void;
  userName: string; updateUserName: (name: string) => void;
  cart: Record<string, number>; count: number; subtotal: number; fee: number; total: number;
  delivery: DeliveryType; setDelivery: (value: DeliveryType) => void;
  address: Address; updateAddress: (value: Address) => void;
  payment: PaymentMethod | null; setPayment: (value: PaymentMethod) => void;
  orders: Order[]; createOrder: () => Order | null;
  repeatOrder: (id: string) => boolean;
  toast: string | null; showToast: (message: string) => void;
  add: (id: string, amount?: number) => void;
  setQuantity: (id: string, amount: number) => void;
  remove: (id: string) => void; clear: () => void;
};
const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [delivery, setDelivery] = useState<DeliveryType>('Entrega');
  const [address, setAddress] = useState<Address>({ street: 'Rua das Flores', number: '120', neighborhood: 'Centro', city: 'São Paulo', complement: '' });
  const [payment, setPayment] = useState<PaymentMethod | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextOrder = useRef(1);

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);
  const showToast = (message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };
  const login = () => setLoggedIn(true);
  const updateUserName = (name: string) => { setUserName(name.trim()); showToast('Nome atualizado com sucesso'); };
  const updateAddress = (value: Address) => { setAddress(value); showToast('Endereço atualizado com sucesso'); };
  const removeNow = (id: string) => setCart(current => { const next = { ...current }; delete next[id]; return next; });
  const remove = (id: string) => {
    const product = products.find(item => item.id === id);
    Alert.alert('Remover produto', `Deseja realmente remover ${product?.name ?? 'este produto'} do carrinho?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => { removeNow(id); showToast('Produto removido do carrinho'); } },
    ]);
  };
  const setQuantity = (id: string, amount: number) => {
    if (amount <= 0) { remove(id); return; }
    setCart(current => ({ ...current, [id]: amount }));
  };
  const add = (id: string, amount = 1) => {
    if (amount <= 0) return;
    setCart(current => ({ ...current, [id]: (current[id] ?? 0) + amount }));
    const product = products.find(item => item.id === id);
    showToast(`${product?.name ?? 'Produto'} adicionado ao carrinho`);
  };
  const clear = () => setCart({});
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const subtotal = products.reduce((sum, product) => sum + product.price * (cart[product.id] ?? 0), 0);
  const fee = count > 0 && delivery === 'Entrega' ? 4.99 : 0;
  const total = subtotal + fee;
  const createOrder = (): Order | null => {
    if (!count || !payment) return null;
    const order: Order = {
      id: String(nextOrder.current++).padStart(4, '0'), createdAt: new Date().toISOString(),
      items: products.filter(product => cart[product.id]).map(product => ({ productId: product.id, name: product.name, unit: product.unit, unitPrice: product.price, quantity: cart[product.id] })),
      itemCount: count, subtotal, fee, total, delivery,
      address: delivery === 'Entrega' ? { ...address } : null, payment, status: 'Confirmado',
    };
    setOrders(current => [order, ...current]);
    clear();
    return order;
  };
  const repeatOrder = (id: string) => {
    const order = orders.find(item => item.id === id);
    if (!order) return false;
    setCart(Object.fromEntries(order.items.map(item => [item.productId, item.quantity])));
    setDelivery('Entrega');
    setPayment(null);
    showToast(`Itens do pedido #${order.id} no carrinho`);
    return true;
  };
  const value = { loggedIn, login, userName, updateUserName, cart, count, subtotal, fee, total, delivery, setDelivery, address, updateAddress, payment, setPayment, orders, createOrder, repeatOrder, toast, showToast, add, setQuantity, remove, clear };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error('useShop deve ser usado dentro de ShopProvider');
  return value;
}
