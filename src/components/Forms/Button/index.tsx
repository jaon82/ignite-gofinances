import React from 'react';
import {
  RectButtonProps,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export default function Button({ title, ...rest }: Props) {
  return (
    <GestureHandlerRootView>
      <Container {...rest}>
        <Title>{title}</Title>
      </Container>
    </GestureHandlerRootView>
  );
}
