import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { CategoryGrid } from '../components/CategoryGrid';
import { Header, SearchBar } from '../components/UI';
import { categories, products } from '../data/products';
import { colors } from '../theme';
import { normalizeSearch } from '../utils/search';

export default function Home() {
  const [query, setQuery] = useState('');
  const normalized = normalizeSearch(query);
  const matchingCategories = normalized ? categories.filter(category => normalizeSearch(category.name).includes(normalized)) : [];
  const matchingProducts = normalized ? products.filter(product => normalizeSearch(product.name).includes(normalized)) : [];
  return <View style={{ flex: 1 }}><Header title="Mercado Fácil" home /><ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled"><SearchBar value={query} onChangeText={setQuery} placeholder="Buscar produtos" />
    {normalized ? <><Text style={s.heading}>Resultados</Text>{matchingCategories.map(category => <Pressable key={category.id} style={s.result} onPress={() => router.push({ pathname: '/category/[id]', params: { id: category.id } })} accessibilityRole="button"><Image source={category.image} style={s.resultImage} /><View><Text style={s.type}>Categoria</Text><Text style={s.resultText}>{category.name}</Text></View></Pressable>)}{matchingProducts.map(product => <Pressable key={product.id} style={s.result} onPress={() => router.push({ pathname: '/product/[id]', params: { id: product.id } })} accessibilityRole="button"><Image source={product.image} style={s.resultImage} /><View><Text style={s.type}>Produto</Text><Text style={s.resultText}>{product.name}</Text></View></Pressable>)}{!matchingCategories.length && !matchingProducts.length && <Text style={s.empty}>Nenhum resultado encontrado.</Text>}</> : <><Text style={s.heading}>Categorias</Text><CategoryGrid /></>}
  </ScrollView></View>;
}
const s = StyleSheet.create({ content: { paddingHorizontal: 17, paddingTop: 17, paddingBottom: 24 }, heading: { marginTop: 26, marginBottom: 17, fontSize: 22, fontWeight: '700', color: colors.darkGreen }, result: { borderWidth: 1, borderColor: colors.border, borderRadius: 13, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 9, padding: 7 }, resultImage: { width: 65, height: 65 }, type: { color: colors.green, fontSize: 12, fontWeight: '700' }, resultText: { fontSize: 17, fontWeight: '600', color: colors.text }, empty: { color: colors.muted, fontSize: 16 } });
