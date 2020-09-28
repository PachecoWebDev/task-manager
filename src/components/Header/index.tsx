import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import { signOut } from '../../store/modules/auth/actions.js';

import logoImg from '../../assets/tasks.svg';

import { Container, HeaderList } from './styles';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.user.profile);

  const handleLogOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  return (
    <Container>
      <header>
        <Link to="/">
          <img src={logoImg} alt="World Map" />
        </Link>

        {profile ? (
          <HeaderList>
            <li>
              <span>
                Bem vindo, <strong>{profile.name}!</strong>
              </span>
            </li>
            {/* <li>
              <button type="button" onClick={handleLogOut}>
                <FiLogOut />
              </button>
            </li> */}
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
