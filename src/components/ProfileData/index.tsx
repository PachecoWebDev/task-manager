import React from 'react';
import { useSelector } from 'react-redux';

import {
  Container,
  Flex,
  Avatar,
  Column,
  BirthIcon,
  CepIcon,
  AddressIcon,
  CpfIcon,
} from './styles';

interface ProfileProps {
  avatarUrl?: string;
  name: string;
  email: string;
  birth: string;
}

const ProfileData: React.FC<ProfileProps> = ({ avatarUrl }) => {
  const profile = useSelector((state: any) => state.user.profile);

  return (
    <Container>
      <Flex>
        <Avatar src={avatarUrl} alt={profile.name} />

        <div>
          <h1>{profile.name}</h1>
          <h2>{profile.email}</h2>
        </div>
      </Flex>

      <Column>
        <li>
          <BirthIcon />
          <span>Data de nascimento: {profile.birth}</span>
        </li>
        <li>
          <CpfIcon />
          <span>CPF: {profile.cpf}</span>
        </li>
        <li>
          <CepIcon />
          <span>CEP: {profile.cep}</span>
        </li>
        <li>
          <AddressIcon />
          <span>Endereço: {profile.address}</span>
        </li>
        <li>
          <AddressIcon />
          <span>Número: {profile.number}</span>
        </li>
      </Column>
    </Container>
  );
};

export default ProfileData;
