import React from 'react';

import { Container, Flex, Avatar, Column, BirthIcon, TaskIcon } from './styles';

interface ProfileProps {
  avatarUrl?: string;
  name: string;
  email: string;
  birth: string;
  tasks: number;
}

const ProfileData: React.FC<ProfileProps> = ({
  avatarUrl,
  name,
  email,
  birth,
  tasks,
}) => {
  return (
    <Container>
      <Flex>
        <Avatar src={avatarUrl} alt={name} />

        <div>
          <h1>{name}</h1>
          <h2>{email}</h2>
        </div>
      </Flex>

      <Column>
        <li>
          <BirthIcon />
          <span>Data de nascimento: {birth}</span>
        </li>
        <li>
          <TaskIcon />
          <span>Tarefas: {tasks}</span>
        </li>
      </Column>
    </Container>
  );
};

export default ProfileData;
