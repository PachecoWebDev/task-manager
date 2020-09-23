import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  background: transparent;
  width: 100%;
  padding: 20px 0;

  header {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      max-width: 40px;
    }
  }
`;

export const HeaderList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;

  li {
    font-size: 20px;

    a {
      color: #ffffff;
      text-decoration: none;

      &:hover {
        color: ${shade(0.2, '#ffffff')};
      }
    }

    button {
      background: none;
      border: none;
      margin: 10px 0 0 10px;

      svg {
        font-size: 24px;
        color: #ffab28;
        transition: color 0.2s;
      }

      &:hover svg {
        color: #d59229;
      }
    }
  }

  li.signup {
    border: 1px solid #ffffff;
    border-radius: 8px;
    padding: 8px;
    margin: 0 16px;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      border-color: ${shade(0.3, '#ffffff')};

      a {
        color: ${shade(0.3, '#ffffff')};
      }
    }
  }
`;
