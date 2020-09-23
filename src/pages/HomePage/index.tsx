import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import {
  FiLock,
  FiMail,
  FiMap,
  FiMapPin,
  FiSun,
  FiUser,
  FiUserCheck,
} from 'react-icons/fi';

import { FormHandles } from '@unform/core';

import Header from '../../components/Header';
import Input from '../../components/Input';

import logoImg from '../../assets/tasks.svg';

import { Container, Content, PageTitle, FormContainer } from './styles';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

const HomePage: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async () => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        birth: Yup.string().required(),
        cpf: Yup.string(),
        cep: Yup.string(),
        address: Yup.string(),
        number: Yup.string(),
        password: Yup.string().required(),
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <PageTitle>
          <img src={logoImg} alt="Logo Your Tasks" />
          <h1>YourTasks</h1>
          <p>Your favorite task manager for everything</p>
        </PageTitle>

        <FormContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="name" icon={FiUser} placeholder="Nome Completo" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="birth" icon={FiSun} placeholder="Data de Nascimento" />
            <Input name="cpf" icon={FiUserCheck} placeholder="CPF" />
            <Input name="cep" type="number" icon={FiMap} placeholder="CEP" />
            <Input name="address" icon={FiMapPin} placeholder="Endereço" />
            <Input
              name="number"
              type="number"
              icon={FiMapPin}
              placeholder="Número"
            />
            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Senha"
            />
            <Button type="submit">Sign up for YourTasks</Button>
          </Form>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default HomePage;
