import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Poppins_400Regular as regularFont,
  Poppins_500Medium as mediumFont,
  Poppins_700Bold as boldFont,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

import theme from './src/global/styles/theme';
import Register from './src/screens/Register';

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
      <Register />
    </ThemeProvider>
  );
}
