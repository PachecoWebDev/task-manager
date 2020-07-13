import styled from 'styled-components';

export const Container = styled.button`
  background: linear-gradient(90deg, #f27a54 0%, #a154f2 100%);
  color: #fff;
  font-weight: 500;
  height: 56px;
  border-radius: 20px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  margin-top: 16px;
  opacity: 1;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;
