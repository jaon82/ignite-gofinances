import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard, {
  TransactionCardProps,
} from '../../components/TransactionCard';

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
  LogoutButton,
  LoadContainer,
} from './styles';
import { useAuth } from '../../hooks/auth';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightDataProps {
  amount: string;
  lastTransaction: string;
}
interface HighlightData {
  entries: HighlightDataProps;
  expenses: HighlightDataProps;
  total: HighlightDataProps;
}

export default function Dashboard() {
  const theme = useTheme();
  const { signOut, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData,
  );

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'up' | 'down' | 'total',
  ) {
    const collectionFiltered =
      type === 'total'
        ? collection
        : collection.filter(transaction => transaction.type === type);
    if (collectionFiltered.length === 0) {
      return 0;
    }
    const lastTransaction = new Date(
      Math.max(
        ...collectionFiltered.map(transaction =>
          new Date(transaction.date).getTime(),
        ),
      ),
    );
    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      'pr-BR',
      { month: 'long' },
    )}`;
  }

  async function loadTransactions() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactionsLoaded = response ? JSON.parse(response) : [];
    let entriesSum = 0;
    let expensesSum = 0;
    const transactionsFormatted: DataListProps[] = transactionsLoaded.map(
      (item: DataListProps) => {
        if (item.type === 'up') {
          entriesSum += Number(item.amount);
        } else {
          expensesSum += Number(item.amount);
        }
        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date));
        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      },
    );
    setTransactions(transactionsFormatted);
    const lastTransactionEntries = getLastTransactionDate(
      transactionsLoaded,
      'up',
    );
    const lastTransactionExpenses = getLastTransactionDate(
      transactionsLoaded,
      'down',
    );
    const lastTransactionTotal = getLastTransactionDate(
      transactionsLoaded,
      'total',
    );
    const totalInterval =
      lastTransactionTotal === 0
        ? 'N??o h?? transa????es'
        : `01 a ${lastTransactionTotal}`;
    const total = entriesSum - expensesSum;
    setHighlightData({
      entries: {
        amount: entriesSum.toLocaleString('pt-Br', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction:
          lastTransactionEntries === 0
            ? 'N??o h?? transa????es'
            : `??ltima entrada dia ${lastTransactionEntries}`,
      },
      expenses: {
        amount: expensesSum.toLocaleString('pt-Br', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction:
          lastTransactionExpenses === 0
            ? 'N??o h?? transa????es'
            : `??ltima sa??da dia ${lastTransactionExpenses}`,
      },
      total: {
        amount: total.toLocaleString('pt-Br', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      },
    });
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, []),
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Ol??,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
              type="up"
            />
            <HighlightCard
              title="Sa??das"
              amount={highlightData.expenses.amount}
              lastTransaction={highlightData.expenses.lastTransaction}
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
              type="total"
            />
          </HighlightCards>
          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
