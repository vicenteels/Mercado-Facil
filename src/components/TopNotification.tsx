import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useShop } from '../context/ShopContext';
import { colors } from '../theme';

export function TopNotification() {
  const { toast } = useShop();
  const insets = useSafeAreaInsets();
  if (!toast) return null;
  return <View pointerEvents="none" style={[s.toast, { top: insets.top + 8 }]} accessibilityLiveRegion="polite"><Ionicons name="checkmark-circle-outline" size={20} color={colors.darkGreen} /><Text style={s.text}>{toast}</Text></View>;
}
const s = StyleSheet.create({ toast: { position: 'absolute', left: 16, right: 16, zIndex: 20, minHeight: 50, borderRadius: 12, backgroundColor: colors.paleGreen, borderColor: colors.green, borderWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14 }, text: { flex: 1, color: colors.darkGreen, fontSize: 15, fontWeight: '600' } });
