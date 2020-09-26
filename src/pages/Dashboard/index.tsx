import React, { useCallback, useEffect, useState } from 'react';
import { uuid } from 'uuidv4';

import Header from '../../components/Header';
import ProfileData from '../../components/ProfileData';
import ModalAddTask from '../../components/ModalAddTask';
import ModalEditTask from '../../components/ModalEditTask';
import TaskItem from '../../components/TaskItem';

import { Container, Main, LeftSide, RightSide, Tasks } from './styles';

interface TaskItem {
  id: string;
  title: string;
  description?: string;
  deliveryDate: string;
  completionDate?: string;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [editingTask, setEditingTask] = useState<TaskItem>({} as TaskItem);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadTasks(): Promise<void> {
      const response = localStorage.getItem('@Tasks');

      setTasks(response.data);
    }

    loadTasks();
  }, []);

  const handleAddTask = useCallback(
    (task: Omit<TaskItem, 'id'>): void => {
      try {
        const id = uuid();
        const newTask = {
          id,
          title: task.title,
          description: task.description,
          deliveryDate: task.deliveryDate,
          completionDate: task.completionDate,
        };

        localStorage.setItem(`@Task:${newTask.id}`, JSON.stringify(newTask));

        setTasks([...tasks, newTask]);
      } catch (err) {
        console.log(err);
      }
    },
    [tasks],
  );

  const handleUpdateTask = useCallback(
    (task: TaskItem): void => {
      try {
        localStorage.removeItem(`@Task:${task.id}`);
        localStorage.setItem(`@Task:${task.id}`, JSON.stringify(task));

        const response = localStorage.getItem(`@task:${task.id}`);

        if (response) {
          setEditingTask(JSON.parse(response));
        }

        const newTask = {
          id: editingTask.id,
          title: editingTask.title,
          description: editingTask.description,
          deliveryDate: editingTask.deliveryDate,
          completionDate: editingTask.completionDate,
        };

        const taskIndex = tasks.findIndex(
          taskSelected => taskSelected.id === task.id,
        );
        tasks.splice(taskIndex, 1);

        setTasks([...tasks, newTask]);
      } catch (err) {
        console.log(err);
      }
    },
    [
      tasks,
      editingTask.id,
      editingTask.title,
      editingTask.description,
      editingTask.deliveryDate,
      editingTask.completionDate,
    ],
  );

  const handleDeleteTask = useCallback(
    (id: string): void => {
      try {
        const taskIndex = tasks.findIndex(task => task.id === id);
        tasks.splice(taskIndex, 1);

        localStorage.removeItem(`@Task:${id}`);

        setTasks([...tasks]);
      } catch (err) {
        console.log(err);
      }
    },
    [tasks],
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
              avatarUrl="https://avatars1.githubusercontent.com/u/12235370?s=460&u=1e4d49d385dbf5a15cc000377f8757a39822c554&v=4"
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
              <h1>Your last tasks</h1>

              <div>
                {tasks &&
                  tasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      handleEditTask={handleEditTask}
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
