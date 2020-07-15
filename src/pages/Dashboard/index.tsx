import React, { useEffect, useState, useCallback } from 'react';
import { FiXCircle } from 'react-icons/fi';
import Header from '../../components/Header';
import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import { Container, TableContainer, Title } from './styles';

interface Pais {
  id: number;
  nome: string;
  sigla: string;
  gentilico: string;
}

const Dashboard: React.FC = () => {
  const { administrador, logOut } = useAuth();
  const [paises, setPaises] = useState<Pais[]>([]);
  const token = localStorage.getItem('@CadastroDePaises:token');

  useEffect(() => {
    async function loadCountries(): Promise<void> {
      try {
        const response = await api.get('/pais/listar', {
          params: {
            token,
          },
        });
        setPaises(response.data);
      } catch (err) {
        logOut();
      }
    }
    loadCountries();
  }, [token, logOut]);

  const handleDeleteCountry = useCallback(
    async id => {
      const paisIndex = paises.findIndex(pais => pais.id === id);

      await api.get('pais/excluir', {
        params: {
          id,
          token,
        },
      });

      paises.splice(paisIndex, 1);

      setPaises([...paises]);
    },
    [token, paises],
  );
  return (
    <>
      <Header />
      <Container>
        <Title>Países Cadastrados</Title>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Sigla</th>
                <th>Gentílico</th>
                {administrador && <th>Excluir</th>}
              </tr>
            </thead>
            <tbody>
              {paises.map(pais => (
                <tr key={pais.id}>
                  <td>{pais.id}</td>
                  <td>{pais.nome}</td>
                  <td>{pais.sigla}</td>
                  <td>{pais.gentilico}</td>
                  {administrador && (
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDeleteCountry(pais.id)}
                      >
                        <FiXCircle />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
