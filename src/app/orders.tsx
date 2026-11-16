import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Header } from '../components/UI';
import { useShop } from '../context/ShopContext';
import { colors, money } from '../theme';

export default function OrdersScreen() {
  const { orders } = useShop();
  return <View style={{ flex: 1 }}><Header title="Pedidos" /><ScrollView contentContainerStyle={s.content}>{orders.length ? orders.map(order => <Pressable key={order.id} style={s.card} onPress={() => router.push({ pathname: '/order/[id]', params: { id: order.id } })} accessibilityRole="button" accessibilityLabel={`Abrir pedido ${order.id}`}><View style={s.top}><Text style={s.title}>Pedido #{order.id}</Text><Ionicons name="chevron-forward" size={22} color={colors.muted} /></View><Text style={s.date}>{new Date(order.createdAt).toLocaleString('pt-BR')}</Text><View style={s.row}><Text style={s.detail}>{order.itemCount} {order.itemCount === 1 ? 'item' : 'itens'} · {order.delivery}</Text><Text style={s.price}>{money(order.total)}</Text></View><Text style={s.status}>{order.status}</Text></Pressable>) : <View style={s.empty}><Ionicons name="clipboard-outline" size={43} color={colors.muted} /><Text style={s.emptyTitle}>Nenhum pedido ainda</Text><Text style={s.emptyText}>Seus pedidos aparecerão aqui após a compra.</Text></View>}</ScrollView></View>;
}
const s = StyleSheet.create({ content: { padding: 17, paddingBottom: 25 }, card: { borderWidth: 1, borderColor: colors.border, borderRadius: 15, padding: 16, marginBottom: 12, gap: 8 }, top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, title: { color: colors.darkGreen, fontSize: 19, fontWeight: '700' }, date: { color: colors.muted, fontSize: 14 }, row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, detail: { color: colors.text, fontSize: 15 }, price: { color: colors.darkGreen, fontSize: 18, fontWeight: '700' }, status: { alignSelf: 'flex-start', color: colors.green, backgroundColor: colors.paleGreen, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 5, fontSize: 13, fontWeight: '700' }, empty: { alignItems: 'center', paddingTop: 80 }, emptyTitle: { color: colors.darkGreen, fontSize: 20, fontWeight: '700', marginTop: 10 }, emptyText: { color: colors.muted, fontSize: 15, textAlign: 'center', marginTop: 5 } });
