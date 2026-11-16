import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CategoryGrid } from '../components/CategoryGrid';
import { Header } from '../components/UI';
import { colors } from '../theme';

export default function CategoriesScreen() {
  return <View style={{ flex: 1 }}><Header title="Categorias" /><ScrollView contentContainerStyle={s.content}><Text style={s.title}>Encontre o que você precisa</Text><CategoryGrid /></ScrollView></View>;
}
const s = StyleSheet.create({ content: { paddingHorizontal: 17, paddingTop: 18, paddingBottom: 24 }, title: { color: colors.muted, fontSize: 16, marginBottom: 18 } });
