import React, { useCallback } from 'react';

import {
  Container,
  TopTask,
  ContentTask,
  BottomTask,
  DateIcon,
  CheckIcon,
  EditIcon,
  EyeIcon,
  SquareIcon,
} from './styles';

interface TaskItem {
  id: string;
  title: string;
  description?: string;
  deliveryDate: string;
  completionDate?: string;
}

interface Props {
  task: TaskItem;
  handleEditTask: (task: TaskItem) => void;
  handleDeleteTask: (id: string) => void;
}

const TaskItem: React.FC<Props> = ({
  task,
  handleEditTask,
  handleDeleteTask,
}) => {
  const handleViewTask = useCallback(id => {}, []);

  const handleFinishTask = useCallback(id => {}, []);

  const setEditingTask = useCallback(() => {
    handleEditTask(task);
  }, [handleEditTask, task]);

  return (
    <Container>
      <TopTask>
        <header>
          <CheckIcon />
          <h1>{task.title}</h1>
        </header>
      </TopTask>

      <ContentTask>
        <p>{task.description}</p>

        <ul>
          <li>
            <DateIcon />
            <p>Data de entrega: </p>
            <span>{task.deliveryDate}</span>
          </li>
          {task.completionDate && (
            <li>
              <DateIcon />
              <p>Data de conclusão: </p>
              <span>{task.completionDate}</span>
            </li>
          )}
        </ul>
      </ContentTask>

      <BottomTask>
        <button type="button" className="icon" onClick={() => setEditingTask()}>
          <EditIcon />
          Editar
        </button>

        <button
          type="button"
          className="icon"
          onClick={() => handleDeleteTask(task.id)}
        >
          <SquareIcon />
          Excluir
        </button>

        {/* <button
          type="button"
          className="icon"
          onClick={() => handleViewTask(task.id)}
        >
          <EyeIcon />
        </button> */}

        <button
          type="button"
          className="icon"
          onClick={() => handleFinishTask(task.id)}
        >
          <SquareIcon />
          Conluir
        </button>
      </BottomTask>
    </Container>
  );
};

export default TaskItem;
