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

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateTask: (task: Omit<TaskItem, 'id'>) => void;
  editingTask: TaskItem;
}

interface IEditTaskData {
  id: string;
  title: string;
  description?: string;
  deliveryDate: string;
  completionDate?: string;
}

const ModalEditTask: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingTask,
  handleUpdateTask,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditTaskData) => {
      handleUpdateTask(data);

      setIsOpen();
    },
    [handleUpdateTask, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingTask}>
        <h1>Editar tarefa</h1>

        <Input name="title" placeholder="Título da tarefa" />
        <Input name="description" placeholder="Descrição" />

        <Input name="deliveryDate" placeholder="Data de entrega" />
        <Input name="completionDate" placeholder="Data de conclusão" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar tarefa</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditTask;
