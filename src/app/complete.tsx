import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { PrimaryButton } from '../components/UI';
import { useShop } from '../context/ShopContext';
import { colors, money } from '../theme';

export default function CompleteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { orders } = useShop();
  const order = orders.find(item => item.id === id);
  return <View style={s.root}><Ionicons name="checkmark-circle" size={70} color={colors.green} /><Text style={s.title}>Pedido realizado com sucesso</Text>{order && <View style={s.card}><Text style={s.line}>Pedido #{order.id}</Text><Text style={s.line}>Total: {money(order.total)}</Text><Text style={s.line}>Recebimento: {order.delivery}</Text></View>}<View style={s.buttons}><PrimaryButton label="Ver pedidos" onPress={() => router.replace('/orders')} /><PrimaryButton label="Voltar para o início" onPress={() => router.replace('/home')} /></View></View>;
}
const s = StyleSheet.create({ root: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' }, title: { fontSize: 24, fontWeight: '700', textAlign: 'center', color: colors.darkGreen, marginTop: 14, marginBottom: 20 }, card: { width: '100%', borderWidth: 1, borderColor: colors.border, borderRadius: 15, padding: 17, gap: 9 }, line: { color: colors.text, fontSize: 17 }, buttons: { width: '100%', marginTop: 26, gap: 10 } });
