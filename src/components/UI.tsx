import React from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useCanGoBack } from 'expo-router';
import { colors, money } from '../theme';
import { Product } from '../data/products';
import { useShop } from '../context/ShopContext';

export function Header({ title, back = false, home = false }: { title: string; back?: boolean; home?: boolean }) {
  const { count } = useShop();
  const canGoBack = useCanGoBack();
  return <View style={s.header}>
    {back && canGoBack && <Pressable onPress={() => { if (router.canGoBack()) router.back(); }} style={s.headerIcon} accessibilityRole="button" accessibilityLabel="Voltar"><Ionicons name="arrow-back" size={28} color={colors.darkGreen} /></Pressable>}
    {home && <Ionicons name="cart-outline" size={32} color={colors.green} style={{ marginRight: 7 }} />}
    <Text style={[s.headerTitle, home && { flex: 1 }]} numberOfLines={1}>{title}</Text>
    <Pressable onPress={() => router.push({ pathname: '/cart', params: { from: 'header' } })} style={s.cartIcon} accessibilityRole="button" accessibilityLabel={`Carrinho com ${count} itens`}>
      <Ionicons name="cart-outline" size={31} color={colors.text} />
      {count > 0 && <View style={s.badge}><Text style={s.badgeText}>{count}</Text></View>}
    </Pressable>
  </View>;
}

export function SearchBar({ value, onChangeText, placeholder }: { value: string; onChangeText: (value: string) => void; placeholder: string }) {
  return <View style={s.search}><Ionicons name="search" size={23} color={colors.muted} /><TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.muted} style={s.searchInput} accessibilityLabel={placeholder} returnKeyType="search" /></View>;
}

export function QuantitySelector({ quantity, onMinus, onPlus, suffix }: { quantity: number; onMinus: () => void; onPlus: () => void; suffix?: string }) {
  return <View style={s.quantity}>
    <Pressable onPress={onMinus} style={s.quantityButton} accessibilityRole="button" accessibilityLabel="Diminuir quantidade"><Ionicons name="remove" size={22} color={colors.darkGreen} /></Pressable>
    <Text style={s.quantityText}>{quantity}{suffix ? ` ${suffix}` : ''}</Text>
    <Pressable onPress={onPlus} style={s.quantityButton} accessibilityRole="button" accessibilityLabel="Aumentar quantidade"><Ionicons name="add" size={22} color={colors.darkGreen} /></Pressable>
  </View>;
}

export function PrimaryButton({ label, onPress, disabled = false, icon, compact = false }: { label: string; onPress: () => void; disabled?: boolean; icon?: React.ComponentProps<typeof Ionicons>['name']; compact?: boolean }) {
  return <Pressable onPress={onPress} disabled={disabled} style={[s.primary, compact && s.primaryCompact, disabled && { opacity: .45 }]} accessibilityRole="button" accessibilityState={{ disabled }}>
    {icon && <Ionicons name={icon} size={compact ? 18 : 22} color="#fff" />}<Text style={[s.primaryText, compact && s.primaryTextCompact]}>{label}</Text>
  </Pressable>;
}

export function ProductCard({ product }: { product: Product }) {
  const { cart, add, setQuantity } = useShop();
  const quantity = cart[product.id] ?? 0;
  return <View style={s.productCard}>
    <Pressable onPress={() => router.push({ pathname: '/product/[id]', params: { id: product.id } })} style={s.productMain} accessibilityRole="button" accessibilityLabel={`Ver detalhes de ${product.name}`}>
      <Image source={product.image} style={s.productImage} resizeMode="contain" />
      <View style={s.productInfo}><Text style={s.productName} numberOfLines={2}>{product.name}</Text><Text style={s.productUnit}>1 {product.unit}</Text><View style={s.priceRow}><Text style={s.productPrice}>{money(product.price)}</Text>{product.oldPrice && <Text style={s.oldPrice}>{money(product.oldPrice)}</Text>}</View></View>
    </Pressable>
    <View style={s.productAction}>{quantity ? <QuantitySelector quantity={quantity} onMinus={() => setQuantity(product.id, quantity - 1)} onPlus={() => add(product.id)} /> : <Pressable style={s.addButton} onPress={() => add(product.id)} accessibilityRole="button" accessibilityLabel={`Adicionar ${product.name}`}><Text style={s.addText}>Adicionar</Text></Pressable>}</View>
  </View>;
}

export function PriceSummary({ values }: { values?: { subtotal: number; fee: number; total: number } }) {
  const current = useShop();
  const { subtotal, fee, total } = values ?? current;
  return <View style={s.summary}><View style={s.summaryLine}><Text style={s.summaryLabel}>Subtotal</Text><Text style={s.summaryLabel}>{money(subtotal)}</Text></View><View style={s.summaryLine}><Text style={s.summaryLabel}>Taxa de entrega</Text><Text style={s.summaryLabel}>{money(fee)}</Text></View><View style={s.divider} /><View style={s.summaryLine}><Text style={s.total}>Total</Text><Text style={s.total}>{money(total)}</Text></View></View>;
}

export function SectionRow({ icon, text, onPress }: { icon: React.ComponentProps<typeof Ionicons>['name']; text: string; onPress?: () => void }) {
  return <Pressable onPress={onPress} disabled={!onPress} style={s.sectionRow} accessibilityRole={onPress ? 'button' : undefined}><Ionicons name={icon} size={23} color={colors.muted} /><Text style={s.sectionRowText}>{text}</Text>{onPress && <Ionicons name="chevron-forward" size={22} color={colors.muted} />}</Pressable>;
}

const s = StyleSheet.create({
  header: { height: 66, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, gap: 8 },
  headerIcon: { width: 42, height: 48, justifyContent: 'center' }, headerTitle: { fontSize: 25, fontWeight: '700', color: colors.darkGreen, flexShrink: 1 },
  cartIcon: { marginLeft: 'auto', width: 48, height: 48, alignItems: 'center', justifyContent: 'center' }, badge: { position: 'absolute', right: 0, top: 0, backgroundColor: colors.green, borderRadius: 12, minWidth: 21, height: 21, alignItems: 'center', justifyContent: 'center' }, badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  search: { flexDirection: 'row', alignItems: 'center', gap: 12, height: 52, borderWidth: 1, borderColor: colors.border, borderRadius: 20, paddingHorizontal: 18, backgroundColor: colors.surface }, searchInput: { flex: 1, fontSize: 16, color: colors.text },
  quantity: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.paleGreen, borderRadius: 12, minHeight: 42 }, quantityButton: { width: 40, height: 42, alignItems: 'center', justifyContent: 'center' }, quantityText: { minWidth: 22, textAlign: 'center', fontSize: 18, fontWeight: '700', color: colors.darkGreen },
  primary: { backgroundColor: colors.green, minHeight: 54, borderRadius: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, paddingHorizontal: 18 }, primaryText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  primaryCompact: { gap: 5, paddingHorizontal: 6 }, primaryTextCompact: { fontSize: 14, textAlign: 'center' },
  productCard: { borderWidth: 1, borderColor: colors.border, borderRadius: 15, minHeight: 120, flexDirection: 'row', alignItems: 'center', marginBottom: 10, padding: 9 }, productMain: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center' }, productImage: { width: 96, height: 98 }, productInfo: { flex: 1, borderLeftWidth: 1, borderColor: colors.border, paddingLeft: 12, minHeight: 88, justifyContent: 'center' }, productName: { fontSize: 16, fontWeight: '700', color: colors.text }, productUnit: { fontSize: 14, color: colors.muted, marginTop: 2 }, priceRow: { flexDirection: 'row', alignItems: 'center', gap: 7, flexWrap: 'wrap', marginTop: 7 }, productPrice: { fontSize: 20, color: colors.darkGreen, fontWeight: '700' }, oldPrice: { fontSize: 13, color: colors.muted, textDecorationLine: 'line-through' }, productAction: { marginLeft: 5 }, addButton: { backgroundColor: colors.green, borderRadius: 10, minHeight: 42, paddingHorizontal: 12, justifyContent: 'center' }, addText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  summary: { borderWidth: 1, borderColor: colors.border, borderRadius: 15, paddingHorizontal: 16, paddingVertical: 13, gap: 8 }, summaryLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, summaryLabel: { fontSize: 16, color: colors.text }, divider: { height: 1, backgroundColor: colors.border, marginVertical: 3 }, total: { fontSize: 22, color: colors.darkGreen, fontWeight: '700' },
  sectionRow: { minHeight: 48, borderWidth: 1, borderColor: colors.border, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 13, paddingVertical: 8 }, sectionRowText: { flex: 1, color: colors.text, fontSize: 15 },
});
