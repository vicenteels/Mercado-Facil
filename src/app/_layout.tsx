import React, { useEffect } from 'react';
import { router, Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { ShopProvider, useShop } from '../context/ShopContext';
import { BottomNavigation } from '../components/BottomNavigation';
import { colors } from '../theme';
import { TopNotification } from '../components/TopNotification';

function AppShell() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const { loggedIn } = useShop();
  useEffect(() => { if (!loggedIn && pathname !== '/') router.replace('/'); }, [loggedIn, pathname]);
  return <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: colors.background }}>
    <StatusBar style="dark" />
    <View style={{ flex: 1 }}><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} /></View>
    {pathname !== '/' && pathname !== '/complete' && <BottomNavigation />}
    <TopNotification />
  </View>;
}

export default function RootLayout() {
  return <SafeAreaProvider><ShopProvider><AppShell /></ShopProvider></SafeAreaProvider>;
}
