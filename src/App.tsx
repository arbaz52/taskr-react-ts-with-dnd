import { Box, Button, ChakraProvider, CSSReset, Flex, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, theme, useDisclosure } from '@chakra-ui/core';
import { AddIcon, DragHandleIcon, EditIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import './App.scss';
import Column from './components/Column/Column';
import Header from './components/Header/Header';
import AddColumnModal from './components/modals/AddColumnModal/AddColumnModal';
import { State, Task } from './interfaces';
import { v4 as uuidv4 } from 'uuid';

import { Column as _col } from './interfaces'
import AddTaskModal from './components/modals/AddTaskModal/AddTaskModal';

const App = () => {
  

  const { isOpen: isAddColumnModalOpen, onOpen: onAddColumnModalOpen, onClose: onAddColumnModalClose } = useDisclosure()
  const { isOpen: isAddTaskModalOpen, onOpen: onAddTaskModalOpen, onClose: onAddTaskModalClose } = useDisclosure()
  
  const [selectedColumnToAddTaskIn, setSelectedColumnToAddTaskIn] = useState<string | null>(null)
  const preOnAddTaskModalOpen = (cId: string) => {
    setSelectedColumnToAddTaskIn(cId)
    onAddTaskModalOpen()
  }


  useEffect(() => {
    onAddColumnModalOpen()
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
  const addColumn = (title: string) => {
    const id = uuidv4()
    const col: _col = {
      title, tasks: []
    }
    setState({
      ...state,
      columns: {
        ...state.columns,
        [id]: col
      }
    })
  }
  const deleteTitle = (id: string) => {
    // console.log(id)
    setState({
      ...state,
      columns: {
        ...Object.keys(state.columns).reduce((pv, cv, ci, arr) => {
          // console.log(pv, cv, ci, arr)
          const col = state.columns[cv];
          if (cv !== id)
            return { ...pv, [cv]: col }
          else
            return pv
        }, {})
      }
    })
  }


  const addTask = (title: string, body: string, added_at: Date) => {
    const id = uuidv4()
    const task: Task = {title, body, added_at}
    if(selectedColumnToAddTaskIn == null)
      return

    let col = state.columns[selectedColumnToAddTaskIn]
    col = { ...col, tasks: [...col.tasks, id]}
    setState({
      ...state,
      tasks: {
        ...state.tasks,
        [id]: task
      },

      columns: {
        ...state.columns,
        [selectedColumnToAddTaskIn]: col
      }
    })
  }

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Header />
      <Box p={4}>
        <Heading size="lg">Welcome to taskr.</Heading>
        <Box overflow="auto" w="100%">
          <Flex mt={4} direction="row" width={(Object.keys(state.columns).length * 320 + 300)}>
            {
              Object.keys(state.columns).map(cId => {
                const col = state.columns[cId];
                return (
                  <Column key={cId} col={col} cId={cId} tasks={state.tasks} updateTitle={updateTitle} deleteTitle={deleteTitle} onAddTaskModalOpen={preOnAddTaskModalOpen} />
                )
              })
            }
            <Box w={300} m={3} >
              <Button colorScheme="pink" size="sm" onClick={onAddColumnModalOpen}>
                <AddIcon fontSize="xs" mr={2} />
              Add a new Column
              </Button>
            </Box>

          </Flex>
        </Box>
      </Box>

      <AddTaskModal isOpen={isAddTaskModalOpen} onClose={onAddTaskModalClose} addTask={addTask}/>
      <AddColumnModal isOpen={isAddColumnModalOpen} onClose={onAddColumnModalClose} addColumn={addColumn} />
    </ChakraProvider>
  );
}

export default App;
