import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiLock, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import { signInRequest } from '../../store/modules/auth/actions.js';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';

import { Container, Content, AnimationContainer } from './styles';

import LogoImg from '../../assets/tasks.svg';

interface LogInFormData {
  login: string;
  password: string;
}

const LogIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const loading = useSelector((state: any) => state.auth.loading);

  const dispatch = useDispatch();

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: LogInFormData) => {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        login: Yup.string()
          .email('Digite um email válido')
          .required('Email obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      try {
        dispatch(
          signInRequest({
            email: data.login,
            password: data.password,
          }),
        );

        history.push('login');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [addToast, dispatch, history],
  );

  return (
    <Container>
      <Header />
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="Task Manager" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>

            <Input name="login" icon={FiMail} placeholder="E-mail" />

            <Input
              type="password"
              name="password"
              icon={FiLock}
              placeholder="Senha"
            />

            <Button type="submit">
              {loading ? 'Carregando...' : 'Entrar'}
            </Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default LogIn;
