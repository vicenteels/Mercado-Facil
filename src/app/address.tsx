import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Header, PrimaryButton } from '../components/UI';
import { useShop } from '../context/ShopContext';
import { Address } from '../types/shop';
import { colors } from '../theme';

const fields: { key: keyof Address; label: string }[] = [
  { key: 'street', label: 'Rua' }, { key: 'number', label: 'Número' },
  { key: 'neighborhood', label: 'Bairro' }, { key: 'city', label: 'Cidade' },
  { key: 'complement', label: 'Complemento' },
];
export default function AddressScreen() {
  const { address, updateAddress } = useShop();
  const [draft, setDraft] = useState<Address>({ ...address });
  return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}><Header title="Alterar endereço" back /><ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled"><Text style={s.heading}>Endereço de entrega</Text>{fields.map(field => <View key={field.key}><Text style={s.label}>{field.label}</Text><TextInput style={s.input} value={draft[field.key]} onChangeText={value => setDraft(current => ({ ...current, [field.key]: value }))} accessibilityLabel={field.label} placeholder={field.label} placeholderTextColor={colors.muted} keyboardType={field.key === 'number' ? 'number-pad' : 'default'} /></View>)}</ScrollView><View style={s.footer}><PrimaryButton label="Salvar endereço" disabled={!draft.street.trim() || !draft.number.trim() || !draft.neighborhood.trim() || !draft.city.trim()} onPress={() => { updateAddress(draft); if (router.canGoBack()) router.back(); }} /></View></KeyboardAvoidingView>;
}
const s = StyleSheet.create({ content: { paddingHorizontal: 18, paddingBottom: 25 }, heading: { color: colors.darkGreen, fontSize: 21, fontWeight: '700', marginBottom: 10 }, label: { color: colors.darkGreen, fontSize: 15, fontWeight: '700', marginTop: 17, marginBottom: 7 }, input: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, height: 51, paddingHorizontal: 13, fontSize: 16, color: colors.text, backgroundColor: colors.surface }, footer: { borderTopWidth: 1, borderTopColor: colors.border, padding: 12 } });
