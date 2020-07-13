import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi';

import LogoImg from '../../assets/world.png';

import Input from '../../comopnents/Input';
import Button from '../../comopnents/Button';

import { Container, Content } from './styles';

const LogIn: React.FC = () => (
  <Container>
    <Content>
      <img src={LogoImg} alt="Países" />

      <form>
        <h1>Faça seu login</h1>

        <Input name="email" placeholder="E-mail" icon={FiMail} />

        <Input
          name="password"
          type="password"
          placeholder="Senha"
          icon={FiLock}
        />

        <Button type="submit">Entrar</Button>

        <a href="forgot">Esqueci minha senha</a>
      </form>
    </Content>
  </Container>
);

export default LogIn;
