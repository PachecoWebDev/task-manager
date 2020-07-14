import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiPlus } from 'react-icons/fi';

import logoImg from '../../assets/world.svg';

import { Container } from './styles';

const Header: React.FC = () => (
  <Container>
    <header>
      <img src={logoImg} alt="World Map" />
      <nav>
        <Link to="/dashboard">
          <FiHome />
          Home
        </Link>
        <Link to="/new">
          <FiPlus />
          Novo
        </Link>
      </nav>

      <ul>
        <li>
          <span>Bem vindo Anderson</span>
        </li>
      </ul>
    </header>
  </Container>
);

export default Header;
