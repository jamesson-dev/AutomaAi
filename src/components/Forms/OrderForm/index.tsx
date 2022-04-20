import React, { useState } from 'react';

import { Form, Title } from './styles';
import { Input } from '@components/Controllers/Input';
import { Button } from '@components/Controllers/Button';
import { TextArea } from '@components/Controllers/TextArea';

import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export function OrderForm() {
  const [departament, setdepartament] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleNewOrder() {
    setIsLoading(true);

    firestore()
    .collection('orders')
    .add({
      departament,
      description,
      status: 'open',
      created_at: firestore.FieldValue.serverTimestamp()
    })
    .finally(() => setIsLoading(false));
  }

  return (
    <Form>
      <Title>Novo Chamado</Title>
      <Input placeholder="Setor" onChangeText={setdepartament} />
      <TextArea placeholder="Rotina" onChangeText={setDescription} />

      <Button title="Enviar" isLoading={isLoading} onPress={handleNewOrder} />
    </Form>
  );
}