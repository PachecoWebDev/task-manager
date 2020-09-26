import React from 'react';
import Header from '../../components/Header';

import { useAuth } from '../../hooks/auth';

import { Container, Title } from './styles';

interface Pais {
  id: number;
  nome: string;
  sigla: string;
  gentilico: string;
}

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Title>Dashboard</Title>
      </Container>
    </>
  );
};

export default Dashboard;
