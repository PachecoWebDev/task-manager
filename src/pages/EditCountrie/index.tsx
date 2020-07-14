import React, { useCallback, useRef, useEffect, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';

import { Container, Title } from './styles';

interface CountryProps {
  id: number;
  nome: string;
  sigla: string;
  gentilico: string;
}

interface EditFormData {
  nome: string;
  sigla: string;
  gentilico: string;
}

const EditCountrie: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [countries, setCountries] = useState<CountryProps[]>([]);
  const token = localStorage.getItem('@CadastroDePaises:token');

  useEffect(() => {
    async function loadCountry(): Promise<void> {
      // console.log(props);
      const response = await api.get('/pais/pesquisar', {
        params: {
          // nome,
          token,
        },
      });

      setCountries(response.data);
    }

    loadCountry();
  }, []);

  const handleSubmit = useCallback(async (data: EditFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        nome: Yup.string().required('Preencha o nome do País'),
        sigla: Yup.string()
          .required('Preencha a sigla')
          .max(2, 'Asigla deve conter apenas 2 caracteres'),
        gentilico: Yup.string().required('Preencha o gentílico'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      console.log(err);

      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);
  return (
    <>
      <Header />
      <Container>
        <Title>Editar País</Title>

        {countries.map(country => (
          <Form ref={formRef} onSubmit={handleSubmit} key={country.id}>
            <Input name="nome" placeholder="Brasil" value={country.nome} />

            <Input name="sigla" placeholder="BR" value={country.sigla} />

            <Input
              name="gentilico"
              placeholder="Brasileiro"
              value={country.gentilico}
            />

            <Button type="submit">Salvar</Button>

            <Link to="/dashboard">Cancelar</Link>
          </Form>
        ))}
      </Container>
    </>
  );
};

export default EditCountrie;
