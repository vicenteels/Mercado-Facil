import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PrimaryButton } from '../components/UI';
import { useShop } from '../context/ShopContext';
import { colors } from '../theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useShop();
  return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={s.root}><View style={s.content}><Ionicons name="cart-outline" size={48} color={colors.green} /><Text style={s.title}>Mercado Fácil</Text><Text style={s.subtitle}>Suas compras de um jeito mais simples.</Text><Text style={s.label}>E-mail</Text><TextInput style={s.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="Seu e-mail" placeholderTextColor={colors.muted} accessibilityLabel="E-mail" /><Text style={s.label}>Senha</Text><TextInput style={s.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="Sua senha" placeholderTextColor={colors.muted} accessibilityLabel="Senha" /><View style={s.button}><PrimaryButton label="Entrar" onPress={() => { login(); router.replace('/home'); }} /></View></View></KeyboardAvoidingView>;
}
const s = StyleSheet.create({ root: { flex: 1, justifyContent: 'center', backgroundColor: '#fff', paddingHorizontal: 25 }, content: { width: '100%', maxWidth: 420, alignSelf: 'center' }, title: { fontSize: 31, fontWeight: '700', color: colors.darkGreen, marginTop: 10 }, subtitle: { color: colors.muted, fontSize: 16, marginTop: 5, marginBottom: 32 }, label: { color: colors.darkGreen, fontSize: 16, fontWeight: '700', marginBottom: 8, marginTop: 14 }, input: { borderWidth: 1, borderColor: colors.border, borderRadius: 13, backgroundColor: colors.surface, height: 54, paddingHorizontal: 15, fontSize: 16, color: colors.text }, button: { marginTop: 26 } });
