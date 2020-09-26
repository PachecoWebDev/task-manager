import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/tasks.svg';

import { Container, HeaderList } from './styles';

const Header: React.FC = () => {
  const { nome, logOut } = useAuth();

  const handleLogOut = useCallback(() => {
    logOut();
  }, [logOut]);

  return (
    <Container>
      <header>
        <Link to="/">
          <img src={logoImg} alt="World Map" />
        </Link>

        {nome ? (
          <HeaderList>
            <li>
              <span>
                Bem vindo, <strong>{nome}!</strong>
              </span>
            </li>
            <li>
              <button type="button" onClick={() => handleLogOut()}>
                <FiLogOut />
              </button>
            </li>
          </HeaderList>
        ) : (
          <HeaderList>
            <li>
              <Link to="/login">Sign In</Link>
            </li>
            <li className="signup">
              <Link to="/">Sign Up</Link>
            </li>
          </HeaderList>
        )}
      </header>
    </Container>
  );
};

export default Header;
