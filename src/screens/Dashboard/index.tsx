import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import HighlightCard from '../../components/HighlightCard';
import TransactionCard from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from './styles';

export default function Dashboard() {
  const data = [
    {
      title: 'Title',
      amount: 'R$',
      category: { name: 'Cat', icon: 'dollar-sign' },
      date: '13/01',
    },
    {
      title: 'Title',
      amount: 'R$',
      category: { name: 'Cat', icon: 'dollar-sign' },
      date: '13/01',
    },
    {
      title: 'Title',
      amount: 'R$',
      category: { name: 'Cat', icon: 'dollar-sign' },
      date: '13/01',
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/8743032?v=4',
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Jean</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />
        <HighlightCard
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
          type="total"
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          renderItem={({ item }) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: getBottomSpace() }}
        />
      </Transactions>
    </Container>
  );
}
