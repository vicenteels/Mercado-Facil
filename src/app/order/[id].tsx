import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Header, PriceSummary, PrimaryButton } from '../../components/UI';
import { useShop } from '../../context/ShopContext';
import { colors, money } from '../../theme';
import { formatAddress } from '../../types/shop';

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { orders, repeatOrder } = useShop();
  const order = orders.find(item => item.id === id);
  if (!order) return <View style={{ flex: 1 }}><Header title="Detalhes do pedido" back /><Text style={s.missing}>Pedido não encontrado.</Text></View>;
  return <View style={{ flex: 1 }}><Header title={`Pedido #${order.id}`} back /><ScrollView contentContainerStyle={s.content}><Text style={s.status}>{order.status}</Text><Text style={s.date}>{new Date(order.createdAt).toLocaleString('pt-BR')}</Text><View style={s.card}><Text style={s.heading}>Produtos</Text>{order.items.map(item => <View key={item.productId} style={s.item}><View style={{ flex: 1 }}><Text style={s.name}>{item.name}</Text><Text style={s.unit}>{item.quantity} {item.unit} × {money(item.unitPrice)}</Text></View><Text style={s.value}>{money(item.quantity * item.unitPrice)}</Text></View>)}</View><View style={s.card}><Text style={s.heading}>Recebimento</Text><Text style={s.line}>{order.delivery}</Text>{order.address && <Text style={s.line}>{formatAddress(order.address)}</Text>}</View><View style={s.card}><Text style={s.heading}>Pagamento</Text><Text style={s.line}>{order.payment}</Text></View><PriceSummary values={order} /></ScrollView><View style={s.footer}><PrimaryButton label="Refazer o pedido" icon="cart-outline" onPress={() => { if (repeatOrder(order.id)) router.replace('/cart'); }} /></View></View>;
}
const s = StyleSheet.create({ content: { padding: 17, gap: 11, paddingBottom: 25 }, footer: { borderTopWidth: 1, borderTopColor: colors.border, padding: 12 }, missing: { color: colors.muted, textAlign: 'center', marginTop: 30 }, status: { alignSelf: 'flex-start', color: colors.green, backgroundColor: colors.paleGreen, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 5, fontWeight: '700' }, date: { color: colors.muted, fontSize: 14 }, card: { borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 15, gap: 8 }, heading: { color: colors.darkGreen, fontSize: 18, fontWeight: '700' }, item: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 9, flexDirection: 'row', alignItems: 'center' }, name: { color: colors.text, fontSize: 16, fontWeight: '600' }, unit: { color: colors.muted, fontSize: 14, marginTop: 2 }, value: { color: colors.darkGreen, fontSize: 16, fontWeight: '700' }, line: { color: colors.text, fontSize: 16 } });
