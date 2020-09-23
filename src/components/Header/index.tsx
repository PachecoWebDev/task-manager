import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiPlus, FiLogOut, FiEdit } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/tasks.svg';

import { Container } from './styles';

const Header: React.FC = () => {
  const { nome, administrador, logOut } = useAuth();

  const handleLogOut = useCallback(() => {
    logOut();
  }, [logOut]);

  return (
    <Container>
      <header>
        <img src={logoImg} alt="World Map" />

        {nome ? (
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
        ) : (
          <ul>
            <li>
              <Link to="/login">Sign In</Link>
            </li>
          </ul>
        )}
      </header>
    </Container>
  );
};

export default Header;
