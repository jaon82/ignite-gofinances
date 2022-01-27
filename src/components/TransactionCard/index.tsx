import React from 'react';

import {
  Amount,
  Category,
  CategoryName,
  Container,
  Date,
  Footer,
  Icon,
  Title,
} from './styles';

export default function TransactionCard() {
  return (
    <Container>
      <Title>Title</Title>
      <Amount>R$</Amount>
      <Footer>
        <Category>
          <Icon name="dollar-sign" />
          <CategoryName>Vendas</CategoryName>
        </Category>
        <Date>13/04/2021</Date>
      </Footer>
    </Container>
  );
}
