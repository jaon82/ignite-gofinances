import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';

import Button from '../../components/Forms/Button';
import CategorySelectButton from '../../components/Forms/CategorySelectButton';
import InputForm from '../../components/Forms/InputForm';
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton';
import CategorySelect from '../CategorySelect';
import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionsTypes,
} from './styles';

interface FormData {
  name: string;
  amount: number;
}

export default function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  const { control, handleSubmit } = useForm();

  function handleTransactionsTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }
  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true);
  };
  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false);
  };
  function handleRegister(form: FormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
    console.log(data);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm name="name" control={control} placeholder="Nome" />
          <InputForm name="amount" control={control} placeholder="Preço" />
          <TransactionsTypes>
            <TransactionTypeButton
              type="up"
              title="Incoming"
              onPress={() => handleTransactionsTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              type="down"
              title="Outcoming"
              onPress={() => handleTransactionsTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>
          <CategorySelectButton
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>
        <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
      </Form>
      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
