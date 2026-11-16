import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Header, PrimaryButton, QuantitySelector } from '../../components/UI';
import { products, categories } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import { colors, money } from '../../theme';

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find(item => item.id === id) ?? products[0];
  const { add } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const category = categories.find(item => item.id === product.category)?.name ?? 'Mercado';
  return <View style={{ flex: 1 }}><Header title="Detalhes do Produto" back /><ScrollView contentContainerStyle={s.content}><Image source={product.image} style={s.hero} resizeMode="contain" /><View style={s.dots}><View style={s.dotActive} /><View style={s.dot} /></View><Text style={s.title}>{product.name}</Text><Text style={s.unit}>Vendido por {product.unit}</Text><View style={s.priceLine}><Text style={s.price}>{money(product.price)}</Text><Text style={s.perUnit}>/ {product.unit}</Text></View><View style={s.rule} /><Text style={s.sectionTitle}>Descrição</Text><Text style={s.description}>{product.description}</Text><View style={s.rule} /><Text style={s.sectionTitle}>Informações</Text><Info icon="leaf-outline" label="Categoria" value={category} /><Info icon="scale-outline" label="Unidade de venda" value={product.unit} /><Info icon="location-outline" label="Origem" value={product.origin ?? 'Nacional'} /></ScrollView><View style={s.footer}><QuantitySelector quantity={quantity} suffix={product.unit === 'kg' ? 'kg' : undefined} onMinus={() => setQuantity(Math.max(1, quantity - 1))} onPlus={() => setQuantity(quantity + 1)} /><View style={{ flex: 1 }}><PrimaryButton label={added ? 'Adicionado!' : 'Adicionar ao carrinho'} icon="cart-outline" compact onPress={() => { add(product.id, quantity); setAdded(true); setTimeout(() => setAdded(false), 1800); }} /></View></View></View>;
}

function Info({ icon, label, value }: { icon: React.ComponentProps<typeof Ionicons>['name']; label: string; value: string }) { return <View style={s.info}><Ionicons name={icon} size={19} color={colors.darkGreen} /><Text style={s.infoLabel}>{label}</Text><Text style={s.infoValue}>{value}</Text></View>; }
const s = StyleSheet.create({ content: { paddingHorizontal: 20, paddingBottom: 18 }, hero: { width: '100%', height: 250 }, dots: { flexDirection: 'row', justifyContent: 'center', gap: 7, marginBottom: 13 }, dotActive: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.green }, dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border }, title: { fontSize: 29, fontWeight: '700', color: colors.darkGreen }, unit: { color: colors.muted, fontSize: 16, marginTop: 3 }, priceLine: { flexDirection: 'row', alignItems: 'baseline', gap: 7, marginTop: 12 }, price: { color: colors.green, fontSize: 34, fontWeight: '700' }, perUnit: { color: colors.muted, fontSize: 18 }, rule: { height: 1, backgroundColor: colors.border, marginVertical: 18 }, sectionTitle: { fontSize: 19, fontWeight: '700', color: colors.darkGreen, marginBottom: 7 }, description: { color: colors.muted, fontSize: 16, lineHeight: 23 }, info: { flexDirection: 'row', alignItems: 'center', gap: 11, minHeight: 40, borderBottomWidth: 1, borderBottomColor: colors.border }, infoLabel: { color: colors.muted, fontSize: 15, flex: 1 }, infoValue: { color: colors.text, fontSize: 15 }, footer: { borderTopWidth: 1, borderTopColor: colors.border, padding: 12, flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: '#fff' } });
