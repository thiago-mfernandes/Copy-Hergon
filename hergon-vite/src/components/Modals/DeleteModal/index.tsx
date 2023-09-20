import { CancelButton, DeleteButton } from '@/components/Button';
import {
  ModalOverlay,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';
import { Modal, ModalContent, ModalHeader } from '../components';
import { useDeleteStore } from './store/useDeleteStore';

interface DeleteModalProps {
  modalTitle: string;
  idToDelete: string;
  removeFunction: (id: string) => Promise<void>;
}

export function DeleteModal({ modalTitle, idToDelete, removeFunction }: DeleteModalProps){

  const { isOpen, onDeleteModalClose} = useDeleteStore();

  return (
    <Modal isOpen={isOpen} onClose={onDeleteModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {modalTitle}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text textAlign="center">
            Essa ação não poderá ser desfeita. Deseja realmente excluir?
          </Text>
        </ModalBody>

        <ModalFooter>
          <CancelButton onClick={onDeleteModalClose} />
          <DeleteButton onClick={() => 
              idToDelete !== undefined && removeFunction(idToDelete)
            } 
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}