import styled from 'styled-components';

export const Container = styled.div`
  background: transparent;
  width: 100%;
  padding: 0 50px;

  header {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      max-width: 150px;
    }

    ul {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: center;

      li {
        font-size: 20px;

        button {
          background: none;
          border: none;
          margin: 10px 0 0 10px;

          svg {
            font-size: 24px;
            color: #f27a54;
            transition: color 0.2s;
          }

          &:hover svg {
            color: #c53030;
          }
        }
      }
    }
  }
`;
