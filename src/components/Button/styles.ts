import styled from 'styled-components';

export const Container = styled.button`
  background: linear-gradient(90deg, #ffab28 0%, #d59229 100%);
  color: #fff;
  font-weight: 500;
  font-size: 24px;
  height: 56px;
  border-radius: 10px;
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
