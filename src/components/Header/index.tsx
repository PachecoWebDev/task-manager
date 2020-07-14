import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiPlus, FiLogOut } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/world.svg';

import { Container } from './styles';

const Header: React.FC = () => {
  const { nome, administrador, logOut } = useAuth();

  const handleLogOut = useCallback(() => {
    logOut();
    console.log('logout');
  }, [logOut]);

  return (
    <Container>
      <header>
        <img src={logoImg} alt="World Map" />
        <nav>
          <Link to="/dashboard">
            <FiHome />
            Home
          </Link>
          {administrador && (
            <Link to="/new-country">
              <FiPlus />
              Novo
            </Link>
          )}
        </nav>

        <ul>
          <li>
            <span>
              Bem vindo <strong>{nome}</strong>
            </span>
          </li>
          <li>
            <button type="button" onClick={() => handleLogOut()}>
              <FiLogOut />
            </button>
          </li>
        </ul>
      </header>
    </Container>
  );
};

export default Header;
