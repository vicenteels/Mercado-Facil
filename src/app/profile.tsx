import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, PrimaryButton } from '../components/UI';
import { useShop } from '../context/ShopContext';
import { colors } from '../theme';

export default function ProfileScreen() {
  const { userName, updateUserName } = useShop();
  const [draft, setDraft] = useState(userName);
  return <View style={{ flex: 1 }}><Header title="Perfil" /><View style={s.content}><View style={s.avatar}><Ionicons name="person-outline" size={49} color={colors.darkGreen} /></View><Text style={s.label}>Nome</Text><TextInput style={s.input} value={draft} onChangeText={setDraft} placeholder="Digite seu nome" placeholderTextColor={colors.muted} accessibilityLabel="Nome" /><View style={s.button}><PrimaryButton label="Salvar" onPress={() => updateUserName(draft)} /></View></View></View>;
}
const s = StyleSheet.create({ content: { paddingHorizontal: 20, paddingTop: 35 }, avatar: { width: 94, height: 94, borderRadius: 47, backgroundColor: colors.paleGreen, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 36 }, label: { color: colors.darkGreen, fontSize: 16, fontWeight: '700', marginBottom: 9 }, input: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, height: 53, paddingHorizontal: 14, fontSize: 16, color: colors.text, backgroundColor: colors.surface }, button: { marginTop: 22 } });
