import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  border-radius: 10px;
  border-left: 4px solid #6fcf97;
  padding: 16px;
  width: 100%;
  height: 56px;
  color: #747d88;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #30363d;

    &::placeholder {
      color: #747d88;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
