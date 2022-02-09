import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Poppins_400Regular as regularFont,
  Poppins_500Medium as mediumFont,
  Poppins_700Bold as boldFont,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { StatusBar } from 'react-native';
import theme from './src/global/styles/theme';
import { AuthProvider } from './src/hooks/auth';
import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    regularFont,
    mediumFont,
    boldFont,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
