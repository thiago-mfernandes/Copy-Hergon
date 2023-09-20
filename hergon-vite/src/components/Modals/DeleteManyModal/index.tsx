import { useDeleteManyStore } from './store/useDeleteManyStore';
import { CancelButton, DeleteButton } from '@/components/Button';
import {
  ModalOverlay,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';
import { Modal, ModalContent, ModalHeader } from '../components';

interface DeleteManyModalProps {
  allIdToDelete: string[];
  removeFunction: (data: string[]) => Promise<void>;
}

export function DeleteManyModal({ allIdToDelete, removeFunction }: DeleteManyModalProps) {


  const { isOpen, onDeleteManyModalClose } = useDeleteManyStore();

  return (
    <Modal isOpen={isOpen} onClose={onDeleteManyModalClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Excluir itens selecionados
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text textAlign="center">
            Essa ação não poderá ser desfeita. Deseja realmente excluir?
          </Text>
        </ModalBody>

        <ModalFooter>
          <CancelButton onClick={onDeleteManyModalClose} />
          <DeleteButton onClick={() => removeFunction(allIdToDelete)} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}