import React, { useCallback, useRef, ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { differenceInCalendarDays } from 'date-fns';
import { uuid } from 'uuidv4';
import axios from 'axios';
import { validate } from 'gerador-validador-cpf';
import {
  FiLock,
  FiMail,
  FiMap,
  FiMapPin,
  FiSun,
  FiUser,
  FiUserCheck,
} from 'react-icons/fi';

import { useToast } from '../../hooks/toast';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import { signUpRequest } from '../../store/modules/auth/actions.js';

import logoImg from '../../assets/tasks.svg';

import {
  Container,
  Content,
  PageTitle,
  FormContainer,
  AnimationContainer,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  birth: string;
  cpf: string;
  cep: string;
  address: string;
  number: string;
  password: string;
}

interface ViacepAddressResponse {
  logradouro: string;
}

const HomePage: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [address, setAddress] = useState('');

  const dispatch = useDispatch();

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Campo obrigatório'),
          email: Yup.string().email().required('Campo obrigatório'),
          birth: Yup.string().test(
            'birthValidate',
            'Apenas maiores de 12 anos podem realizar o cadastro',
            () => {
              const days = differenceInCalendarDays(
                new Date(),
                new Date(data.birth),
              );
              const twelveYears = 365.25 * 12;

              return days > twelveYears;
            },
          ),
          cpf: Yup.string().test('cpfValidation', 'CPF inválido', cpf => {
            if (cpf !== '') {
              const cpfValidation = validate(cpf);

              if (cpfValidation === false) {
                return cpfValidation;
              }

              return cpfValidation;
            }
            return true;
          }),
          cep: Yup.string(),
          address: Yup.string(),
          number: Yup.string(),
          password: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const id = uuid();

        dispatch(
          signUpRequest({
            id,
            name: data.name,
            email: data.email,
            birth: data.birth,
            cpf: data.cpf,
            cep: data.cep,
            address: data.address,
            number: data.number,
            password: data.password,
          }),
        );

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description:
            'Seu cadastro foi realizado com sucesso, agora você já pode realizar seu login',
        });

        history.push('login');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao realizar o cadastro, tente novamente.',
        });
      }
    },
    [addToast, dispatch, history],
  );

  const searchAddress = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const cep = event.target.value.replace(/[^0-9]/, '');

    if (cep.length !== 8) {
      return false;
    }

    axios
      .get<ViacepAddressResponse>(`https://viacep.com.br/ws/${cep}/json`)
      .then(response => {
        setAddress(response.data.logradouro);
      });
  }, []);
  return (
    <Container>
      <Header />
      <AnimationContainer>
        <Content>
          <PageTitle>
            <img src={logoImg} alt="Logo Your Tasks" />
            <h1>YourTasks</h1>
            <p>Your favorite task manager for everything!</p>
          </PageTitle>

          <FormContainer>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="name" icon={FiUser} placeholder="Nome Completo" />
              <Input name="email" icon={FiMail} placeholder="E-mail" />
              <Input
                name="birth"
                type="date"
                icon={FiSun}
                placeholder="Data de Nascimento"
              />
              <Input name="cpf" icon={FiUserCheck} placeholder="CPF" />
              <Input
                name="cep"
                icon={FiMap}
                placeholder="CEP"
                onBlur={searchAddress}
              />
              <Input
                name="address"
                defaultValue={address}
                icon={FiMapPin}
                placeholder="Endereço"
              />
              <Input name="number" icon={FiMapPin} placeholder="Número" />
              <Input
                name="password"
                type="password"
                icon={FiLock}
                placeholder="Senha"
              />
              <Button type="submit">Sign up for YourTasks</Button>
            </Form>
          </FormContainer>
        </Content>
      </AnimationContainer>
    </Container>
  );
};

export default HomePage;
