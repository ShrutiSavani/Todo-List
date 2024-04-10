import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Td,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { MdDelete } from 'react-icons/md';

const PrintData = ({ data, deleteData, priority }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  return (
    <Tr bg={priority == 'priorable' ? 'blue.900' : 'blue.700'} color="white">
      <Td maxW={{ base: '116px', md: '200px' }} overflow="auto">
        {data.task}
      </Td>
      <Td>{data.priority}</Td>
      <Td>{data.dueDate}</Td>
      <Td>
        <MdDelete onClick={onOpen} />
      </Td>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            width={{ base: '286px', lg: '286px' }}
            m="0"
            pos="fixed"
            top="34vh"
          >
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteData(data.id);
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Tr>
  );
};
export default PrintData;
