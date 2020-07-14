import React, { useCallback, useRef } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import LogoImg from '../../assets/world.svg';

import Input from '../../comopnents/Input';
import Button from '../../comopnents/Button';

import { Container, Content } from './styles';

interface LogInFormData {
  login: string;
  senha: string;
}

const LogIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { logIn, administrador, nome } = useAuth();

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

        logIn({
          login: data.login,
          senha: data.senha,
        });
      } catch (err) {
        console.log(err);

        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    },
    [logIn],
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
