import React, { useCallback, useEffect, useState } from 'react';
import { uuid } from 'uuidv4';
import { FiCheckSquare } from 'react-icons/fi';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import ProfileData from '../../components/ProfileData';
import ModalAddTask from '../../components/ModalAddTask';
import ModalEditTask from '../../components/ModalEditTask';
import TaskItem from '../../components/TaskItem';

import { Container, Main, LeftSide, RightSide, Tasks } from './styles';

import logoImg from '../../assets/tasks.svg';

interface TaskItemData {
  id: string;
  title: string;
  description?: string;
  deliveryDate: string;
  completionDate?: string;
  isOpen: boolean;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItemData[]>([]);
  const [taskQuantity, setTaskQuantity] = useState(0);
  const [editingTask, setEditingTask] = useState<TaskItemData>(
    {} as TaskItemData,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const profile = useSelector((state: any) => state.user.profile);

  useEffect(() => {
    async function loadTasks(): Promise<void> {
      const response = localStorage.getItem(`@UserTasks:${profile.id}`);

      if (response) {
        const parsedResponse = JSON.parse(response);

        setTaskQuantity(parsedResponse.length);
        setTasks(parsedResponse);
      }
    }

    loadTasks();
  }, [profile.id]);

  const handleAddTask = useCallback(
    (task: Omit<TaskItemData, 'id'>): void => {
      try {
        const id = uuid();
        const newTask = {
          id,
          title: task.title,
          description: task.description,
          deliveryDate: task.deliveryDate,
          completionDate: task.completionDate,
          isOpen: true,
        };

        const allTasks = [newTask];
        const storagedUserTasks = localStorage.getItem(
          `@UserTasks:${profile.id}`,
        );

        if (storagedUserTasks) {
          const parsedUserTasks = JSON.parse(storagedUserTasks);

          if (storagedUserTasks) {
            parsedUserTasks.push(newTask);
          }
          localStorage.setItem(
            `@UserTasks:${profile.id}`,
            JSON.stringify(parsedUserTasks),
          );

          setTaskQuantity(parsedUserTasks.length);
        } else {
          localStorage.setItem(
            `@UserTasks:${profile.id}`,
            JSON.stringify(allTasks),
          );
          setTaskQuantity(1);
        }

        setTasks([...tasks, newTask]);
      } catch (err) {
        console.log(err);
      }
    },
    [tasks, profile.id],
  );

  const handleUpdateTask = useCallback(
    (task: TaskItemData): void => {
      try {
        const newTask = {
          id: task.id,
          title: task.title,
          description: task.description,
          deliveryDate: task.deliveryDate,
          completionDate: task.completionDate,
          isOpen: true,
        };
        const response = localStorage.getItem(`@UserTasks:${profile.id}`);

        if (response) {
          const parsedResponse = JSON.parse(response);

          const responseIndex = parsedResponse.findIndex(
            (res: TaskItemData) => res.id === task.id,
          );

          const taskIndex = tasks.findIndex(
            taskSelected => taskSelected.id === task.id,
          );

          parsedResponse.splice(responseIndex, 1);
          tasks.splice(taskIndex, 1);

          setTasks([newTask, ...tasks]);
          parsedResponse.unshift(newTask);

          localStorage.setItem(
            `@UserTasks:${profile.id}`,
            JSON.stringify(parsedResponse),
          );

          setEditingTask(JSON.parse(response));
        }
      } catch (err) {
        console.log(err);
      }
    },
    [tasks, profile.id],
  );

  const handleDeleteTask = useCallback(
    (id: string): void => {
      try {
        const response = localStorage.getItem(`@UserTasks:${profile.id}`);

        if (response) {
          const parsedResponse = JSON.parse(response);

          const responseIndex = parsedResponse.findIndex(
            (res: TaskItemData) => res.id === id,
          );

          parsedResponse.splice(responseIndex, 1);

          localStorage.setItem(
            `@UserTasks:${profile.id}`,
            JSON.stringify(parsedResponse),
          );

          const taskIndex = tasks.findIndex(task => task.id === id);
          tasks.splice(taskIndex, 1);

          localStorage.removeItem(`@Task:${id}`);

          setTasks([...tasks]);
          setTaskQuantity(parsedResponse.length);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [tasks, profile.id],
  );

  const handleFinishTask = useCallback(
    (task: TaskItem) => {
      const newTask = {
        id: task.id,
        title: task.title,
        description: task.description,
        deliveryDate: task.deliveryDate,
        completionDate: `${new Date()
          .getDate()
          .toString()}/${new Date()
          .getMonth()
          .toString()}/${new Date().getFullYear().toString()}`,
        isOpen: false,
      };
      const response = localStorage.getItem(`@UserTasks:${profile.id}`);

      if (response) {
        const parsedResponse = JSON.parse(response);

        const responseIndex = parsedResponse.findIndex(
          (res: TaskItemData) => res.id === task.id,
        );

        const taskIndex = tasks.findIndex(
          taskSelected => taskSelected.id === task.id,
        );

        parsedResponse.splice(responseIndex, 1);
        tasks.splice(taskIndex, 1);

        setTasks([newTask, ...tasks]);
        parsedResponse.unshift(newTask);

        localStorage.setItem(
          `@UserTasks:${profile.id}`,
          JSON.stringify(parsedResponse),
        );
      }
    },
    [profile.id, tasks],
  );

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const toggleEditModal = useCallback(() => {
    setEditModalOpen(!editModalOpen);
  }, [editModalOpen]);

  const handleEditTask = useCallback(
    (task: TaskItem): void => {
      setEditingTask(task);
      toggleEditModal();
    },
    [toggleEditModal],
  );

  return (
    <>
      <Header />
      <Container>
        <Main>
          <LeftSide>
            <ProfileData
              avatarUrl={logoImg}
              name="Anderson Pacheco"
              email="email@email.com"
              birth="10/10/1999"
              tasks={10}
            />
          </LeftSide>

          <RightSide>
            <ModalAddTask
              isOpen={modalOpen}
              setIsOpen={toggleModal}
              handleAddTask={handleAddTask}
            />

            <ModalEditTask
              isOpen={editModalOpen}
              setIsOpen={toggleEditModal}
              editingTask={editingTask}
              handleUpdateTask={handleUpdateTask}
            />
            <Tasks>
              <header>
                <h1>
                  <span>{taskQuantity}</span> Tarefas cadastradas
                </h1>

                <button type="submit" onClick={toggleModal}>
                  <p className="text">Nova tarefa</p>
                  <div className="icon">
                    <FiCheckSquare size={24} />
                  </div>
                </button>
              </header>

              <div>
                {tasks &&
                  tasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      handleEditTask={handleEditTask}
                      handleFinishTask={handleFinishTask}
                      handleDeleteTask={handleDeleteTask}
                    />
                  ))}
              </div>
            </Tasks>
          </RightSide>
        </Main>
      </Container>
    </>
  );
};

export default Dashboard;
