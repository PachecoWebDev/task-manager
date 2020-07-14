import React, { useCallback, useRef } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import LogoImg from '../../assets/world.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

interface LogInFormData {
  login: string;
  senha: string;
}

const LogIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { logIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: LogInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          login: Yup.string().required('Preencha com seu usuário'),
          senha: Yup.string().required('Preencha com sua senha'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await logIn({
          login: data.login,
          senha: data.senha,
        });

        history.push('/dashboard');
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
    [logIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <img src={LogoImg} alt="Países" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>

          <Input name="login" placeholder="Usuário" icon={FiUser} />

          <Input
            name="senha"
            type="password"
            placeholder="Senha"
            icon={FiLock}
          />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>
      </Content>
    </Container>
  );
};

export default LogIn;
