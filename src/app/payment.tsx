import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Header, PrimaryButton } from '../components/UI';
import { useShop } from '../context/ShopContext';
import { PaymentMethod } from '../types/shop';
import { colors } from '../theme';

const methods: { label: PaymentMethod; icon: React.ComponentProps<typeof Ionicons>['name'] }[] = [
  { label: 'Cartão de crédito', icon: 'card-outline' }, { label: 'Cartão de débito', icon: 'card-outline' },
  { label: 'Pix', icon: 'flash-outline' }, { label: 'Dinheiro', icon: 'cash-outline' },
];
export default function PaymentScreen() {
  const { fromReview } = useLocalSearchParams<{ fromReview?: string }>();
  const { payment, setPayment, count } = useShop();
  return <View style={{ flex: 1 }}><Header title="Pagamento" back /><ScrollView contentContainerStyle={s.content}><Text style={s.heading}>Escolha a forma de pagamento</Text>{methods.map(method => <Pressable key={method.label} onPress={() => setPayment(method.label)} style={[s.option, payment === method.label && s.selected]} accessibilityRole="radio" accessibilityState={{ selected: payment === method.label }}><Ionicons name={method.icon} size={25} color={colors.darkGreen} /><Text style={s.optionText}>{method.label}</Text><Ionicons name={payment === method.label ? 'radio-button-on' : 'radio-button-off'} size={24} color={payment === method.label ? colors.green : colors.muted} /></Pressable>)}</ScrollView><View style={s.footer}><PrimaryButton label="Revisar pedido" disabled={!payment || !count} onPress={() => { if (fromReview) { if (router.canGoBack()) router.back(); } else router.push('/checkout'); }} /></View></View>;
}
const s = StyleSheet.create({ content: { padding: 17 }, heading: { color: colors.darkGreen, fontSize: 21, fontWeight: '700', marginBottom: 18 }, option: { borderWidth: 1, borderColor: colors.border, borderRadius: 13, minHeight: 66, marginBottom: 11, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', gap: 12 }, selected: { borderColor: colors.green, backgroundColor: colors.paleGreen }, optionText: { flex: 1, color: colors.text, fontSize: 17 }, footer: { borderTopWidth: 1, borderTopColor: colors.border, padding: 12 } });
