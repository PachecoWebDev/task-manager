import styled, { keyframes } from 'styled-components';
import BackgorundImg from '../../assets/background.svg';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background: url(${BackgorundImg});
  background-position: bottom;
  background-size: cover;
  background-repeat: no-repeat;
`;

const appearFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(-50px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;
`;

export const Content = styled.div`
  max-width: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 30px 0;
`;

export const PageTitle = styled.div`
  width: 400px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 20px;

  img {
    max-width: 200px;
    margin: 0 auto;
  }

  h1 {
    font-size: 72px;
  }

  p {
    font-size: 32px;
    color: #c3c3c3;
  }
`;

export const FormContainer = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
`;
