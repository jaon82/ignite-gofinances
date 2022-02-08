import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Poppins_400Regular as regularFont,
  Poppins_500Medium as mediumFont,
  Poppins_700Bold as boldFont,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { StatusBar } from 'react-native';
import theme from './src/global/styles/theme';
import AppRoutes from './src/routes/app.routes';
import SignIn from './src/screens/SignIn';
import { AuthProvider } from './src/hooks/auth';

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
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AuthProvider>
            <SignIn />
          </AuthProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </ThemeProvider>
  );
}
