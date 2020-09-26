import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface TaskItem {
  id: string;
  title: string;
  description?: string;
  deliveryDate: string;
  completionDate?: string;
}

interface ICreateTaskData {
  id: string;
  title: string;
  description?: string;
  deliveryDate: string;
  completionDate?: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddTask: (task: TaskItem) => void;
}

const ModalAddTask: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddTask,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateTaskData) => {
      handleAddTask(data);
      setIsOpen();
    },
    [handleAddTask, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova tarefa</h1>
        <Input name="title" placeholder="Título da tarefa" />
        <Input name="description" placeholder="Descrição" />

        <Input name="deliveryDate" placeholder="Data de entrega" />
        <Input name="completionDate" placeholder="Data de conclusão" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar tarefa</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddTask;
