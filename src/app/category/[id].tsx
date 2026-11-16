import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Header, ProductCard, SearchBar } from '../../components/UI';
import { categories, products } from '../../data/products';
import { colors } from '../../theme';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [query, setQuery] = useState('');
  const [promotions, setPromotions] = useState(false);
  const [sort, setSort] = useState(false);
  const category = categories.find(item => item.id === id) ?? categories[0];
  const visible = useMemo(() => products.filter(item => item.category === category.id && item.name.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR')) && (!promotions || !!item.oldPrice)).sort((a, b) => sort ? a.price - b.price : 0), [category.id, query, promotions, sort]);
  return <View style={{ flex: 1 }}><Header title={category.name} back /><ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled"><SearchBar value={query} onChangeText={setQuery} placeholder="Buscar nesta categoria" /><View style={s.filters}><Pressable onPress={() => setSort(!sort)} style={[s.chip, sort && s.chipActive]} accessibilityRole="button"><Ionicons name="swap-vertical" size={17} color={colors.darkGreen} /><Text style={s.chipText}>Ordenar</Text></Pressable><Pressable onPress={() => setPromotions(!promotions)} style={[s.chip, promotions && s.chipActive]} accessibilityRole="button"><Ionicons name="pricetag-outline" size={17} color={colors.darkGreen} /><Text style={s.chipText}>Promoções</Text></Pressable></View>{visible.length ? visible.map(product => <ProductCard key={product.id} product={product} />) : <Text style={s.empty}>Nenhum produto encontrado.</Text>}</ScrollView></View>;
}

const s = StyleSheet.create({ content: { paddingHorizontal: 12, paddingTop: 18, paddingBottom: 20 }, filters: { flexDirection: 'row', gap: 10, marginVertical: 17 }, chip: { borderWidth: 1, borderColor: colors.border, borderRadius: 20, minHeight: 38, flexDirection: 'row', gap: 6, alignItems: 'center', paddingHorizontal: 13 }, chipActive: { backgroundColor: colors.paleGreen, borderColor: colors.green }, chipText: { fontSize: 14, color: colors.text }, empty: { textAlign: 'center', color: colors.muted, fontSize: 16, marginTop: 25 } });
