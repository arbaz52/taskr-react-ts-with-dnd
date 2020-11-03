import { Box, Button, ChakraProvider, CSSReset, Flex, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, theme, useDisclosure } from '@chakra-ui/core';
import { AddIcon, DragHandleIcon, EditIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import './App.scss';
import Column from './components/Column/Column';
import Header from './components/Header/Header';
import { State } from './interfaces';

const App = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    onOpen()
  }, [])

  const initialState: State = {
    tasks: {
      'task-1': {
        title: "Task 1",
        body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui, sunt?",
        added_at: new Date(),
      },
      'task-2': {
        title: "Task 2",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        added_at: new Date()
      }
    },
    columns: {
      "column-1": {
        title: "Todos",
        tasks: ['task-1']
      },
      "column-2": {
        title: "Completed",
        tasks: ['task-2']
      }
    }
  }
  const [state, setState] = useState(initialState)

  // for updating column title
  const updateTitle = (id: string, title: string): void => {
    setState({
      ...state,
      columns: {
        ...state.columns,
        [id]: {
          ...state.columns[id],
          title
        }
      }
    })
  }

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Header />
      <Box p={4}>
        <Heading size="lg">Welcome to taskr.</Heading>
        <Flex mt={4} direction="row">
          {
            Object.keys(state.columns).map(cId => {
              const col = state.columns[cId];
              return (
                <Column key={cId} col={col} cId={cId} tasks={state.tasks} updateTitle={updateTitle}/>
              )
            })
          }
          <Box w={300} m={3} >
            <Button colorScheme="pink" size="sm">
              <AddIcon fontSize="xs" mr={2} />
              Add a new Column
              </Button>
          </Box>

        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Input placeholder="Task title" />
              <Textarea placeholder="Task Description | Content" />
              <Text as="p" fontSize="sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, repellendus.
            </Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button size="sm" colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button size="sm" variant="ghost">Add Task</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>



      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new Column</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Input placeholder="Title" />
              <Text as="p" fontSize="sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, repellendus.
            </Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button size="sm" colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button size="sm" variant="ghost">Add Column</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

export default App;
