import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { categories } from '../data/products';
import { colors } from '../theme';

export function CategoryGrid() {
  return <View style={s.grid}>{categories.map(category => <Pressable key={category.id} style={s.category} onPress={() => router.push({ pathname: '/category/[id]', params: { id: category.id } })} accessibilityRole="button" accessibilityLabel={`Abrir ${category.name}`}><Image source={category.image} style={s.image} resizeMode="contain" /><View style={s.label}><Text style={s.text}>{category.name}</Text></View></Pressable>)}</View>;
}
const s = StyleSheet.create({ grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 15 }, category: { width: '48.5%', borderWidth: 1, borderColor: colors.border, borderRadius: 18, overflow: 'hidden', backgroundColor: '#fff' }, image: { width: '100%', height: 142 }, label: { backgroundColor: colors.paleGreen, minHeight: 59, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 }, text: { color: colors.darkGreen, fontSize: 20, fontWeight: '700', textAlign: 'center' } });
