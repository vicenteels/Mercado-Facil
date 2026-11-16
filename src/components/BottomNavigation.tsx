import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';

const tabs: { label: string; icon: React.ComponentProps<typeof Ionicons>['name']; path: '/home' | '/categories' | '/cart' | '/orders' | '/profile' }[] = [
  { label: 'Início', icon: 'home-outline', path: '/home' },
  { label: 'Categorias', icon: 'grid-outline', path: '/categories' },
  { label: 'Carrinho', icon: 'cart-outline', path: '/cart' },
  { label: 'Pedidos', icon: 'clipboard-outline', path: '/orders' },
  { label: 'Perfil', icon: 'person-outline', path: '/profile' },
];

export function BottomNavigation() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const active = pathname === '/home' ? 'Início' : pathname === '/categories' || pathname.startsWith('/category') || pathname.startsWith('/product') ? 'Categorias' : pathname.startsWith('/orders') || pathname.startsWith('/order/') ? 'Pedidos' : pathname === '/profile' ? 'Perfil' : 'Carrinho';
  return <View style={[s.nav, { paddingBottom: Math.max(insets.bottom, 8) }]}>
    {tabs.map(tab => <Pressable key={tab.label} onPress={() => router.replace(tab.path)} style={s.tab} accessibilityRole="tab" accessibilityState={{ selected: active === tab.label }}>
      <Ionicons name={tab.icon} size={26} color={active === tab.label ? colors.green : colors.muted} />
      <Text style={[s.label, active === tab.label && s.active]}>{tab.label}</Text>
    </Pressable>)}
  </View>;
}

const s = StyleSheet.create({ nav: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.background, paddingTop: 9 }, tab: { flex: 1, minHeight: 48, alignItems: 'center', justifyContent: 'center', gap: 3 }, label: { fontSize: 11, color: colors.muted }, active: { color: colors.darkGreen, fontWeight: '700' } });
