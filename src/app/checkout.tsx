import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Header, PriceSummary, PrimaryButton, SectionRow } from '../components/UI';
import { products } from '../data/products';
import { useShop } from '../context/ShopContext';
import { colors, money } from '../theme';
import { formatAddress } from '../types/shop';

export default function CheckoutScreen() {
  const { cart, count, delivery, address, payment, createOrder } = useShop();
  const items = products.filter(product => cart[product.id]);
  return <View style={{ flex: 1 }}><Header title="Finalizar compra" back /><ScrollView contentContainerStyle={s.content}>
    <View style={s.progress}><View style={s.step}><Ionicons name="checkmark-circle-outline" size={30} color={colors.green} /><Text style={s.stepText}>Entrega</Text></View><View style={s.line} /><View style={s.step}><Ionicons name="checkmark-circle-outline" size={30} color={colors.green} /><Text style={s.stepText}>Pagamento</Text></View><View style={s.line} /><View style={s.step}><View style={s.circle}><Text style={s.number}>3</Text></View><Text style={s.stepActive}>Revisão</Text></View></View>
    <Section title="Forma de recebimento"><SectionRow icon={delivery === 'Entrega' ? 'car-outline' : 'storefront-outline'} text={delivery} onPress={() => router.push({ pathname: '/delivery', params: { fromReview: '1' } })} /></Section>
    {delivery === 'Entrega' && <Section title="Endereço de entrega"><SectionRow icon="location-outline" text={formatAddress(address)} onPress={() => router.push('/address')} /></Section>}
    <Section title="Forma de pagamento"><SectionRow icon="card-outline" text={payment ?? 'Selecione uma forma de pagamento'} onPress={() => router.push({ pathname: '/payment', params: { fromReview: '1' } })} /></Section>
    <Section title={delivery === 'Entrega' ? 'Horário de entrega' : 'Horário de retirada'}><SectionRow icon="time-outline" text={delivery === 'Entrega' ? 'Hoje, 18:00 - 19:00' : 'Hoje, após 18:00'} /></Section>
    <Section title="Resumo do pedido">{items.map(product => <View key={product.id} style={s.productRow}><Image source={product.image} style={s.productImage} resizeMode="contain" /><View style={s.productInfo}><Text style={s.productName}>{product.name}</Text><Text style={s.productUnit}>{cart[product.id]} {product.unit}</Text></View><Text style={s.productPrice}>{money(product.price * cart[product.id])}</Text></View>)}</Section>
    <PriceSummary />
  </ScrollView><View style={s.footer}><PrimaryButton label="Confirmar pedido" disabled={!count || !payment} onPress={() => { const order = createOrder(); if (order) router.replace({ pathname: '/complete', params: { id: order.id } }); }} /></View></View>;
}
function Section({ title, children }: { title: string; children: React.ReactNode }) { return <View style={s.section}><Text style={s.sectionTitle}>{title}</Text>{children}</View>; }
const s = StyleSheet.create({ content: { paddingHorizontal: 13, paddingBottom: 20, gap: 9 }, progress: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', marginVertical: 10, paddingHorizontal: 30 }, step: { alignItems: 'center', minWidth: 68 }, line: { flex: 1, height: 2, backgroundColor: colors.green, marginTop: 15 }, stepText: { color: colors.muted, fontSize: 12, marginTop: 3 }, stepActive: { color: colors.darkGreen, fontSize: 12, fontWeight: '700', marginTop: 3 }, circle: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.green, justifyContent: 'center', alignItems: 'center' }, number: { color: '#fff', fontWeight: '700', fontSize: 17 }, section: { borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 10 }, sectionTitle: { fontSize: 17, fontWeight: '700', color: colors.darkGreen, marginBottom: 8 }, productRow: { flexDirection: 'row', alignItems: 'center', minHeight: 55, borderTopWidth: 1, borderTopColor: colors.border }, productImage: { width: 53, height: 53 }, productInfo: { flex: 1, paddingLeft: 9 }, productName: { fontSize: 15, fontWeight: '700', color: colors.text }, productUnit: { fontSize: 13, color: colors.muted }, productPrice: { fontSize: 16, color: colors.darkGreen, fontWeight: '700' }, footer: { borderTopWidth: 1, borderTopColor: colors.border, padding: 12 } });
