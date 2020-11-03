import { Box, Button, Flex, Heading, HStack, Input, Text } from '@chakra-ui/core'
import { AddIcon, DeleteIcon, DragHandleIcon, EditIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import Task from '../Task/Task'
import { Column as _col, Task as _task, Tasks } from './../../interfaces'

interface Props {
    cId: string;
    col: _col;
    tasks: Tasks;
    index: number;
    updateTitle: (id: string, title: string) => void;
    deleteTitle: (id: string) => void;
    onAddTaskModalOpen: (cId: string) => void;
}
const Column = (props: Props) => {
    const [editTitle, setEditTitle] = useState(false)

    const { cId, col, tasks, updateTitle, deleteTitle, onAddTaskModalOpen, index } = props
    const [columnTitle,
        setColumnTitle] = useState(col.title)


    const _updateTitle = (e: any) => {
        e.preventDefault()
        updateTitle(cId, columnTitle)
        setEditTitle(false)
    }

    const _deleteTitle = (e: any) => {
        deleteTitle(cId)
    }

    return (
        <Draggable
        draggableId={cId}
        index={index}>
            {
                (provided, snapshot) => {
                    return (

                        <Box ref={provided.innerRef} {...provided.draggableProps} bg="white" alignSelf="flex-start" key={cId} w={300} m={3} boxShadow="0 0 10px #999">
                            <Flex px={3} py={2} justifyContent="space-between" justifyItems="center">
                                <Flex alignItems="center">
                                    <Box {...provided.dragHandleProps}><DragHandleIcon mr={2} /></Box>
                                    {
                                        !editTitle ? (<Heading onClick={e => setEditTitle(true)} size="sm">{col.title}</Heading>) : (
                                            <form onSubmit={_updateTitle}>
                                                <Input size="xs" fontSize="xs" p={1} value={columnTitle} onChange={e => setColumnTitle(e.target.value)} />

                                            </form>
                                        )
                                    }
                                </Flex>
                                <HStack>
                                    <Button size="xs" onClick={e => setEditTitle(pv => !pv)}>
                                        <EditIcon />
                                    </Button>
                                    <Button size="xs" colorScheme="red" onClick={_deleteTitle}>
                                        <DeleteIcon />
                                    </Button>
                                </HStack>
                            </Flex>
                            <Droppable
                                droppableId={cId}>
                                {
                                    (provided, snapshot) => {
                                        return (
                                            <Box ref={provided.innerRef} {...provided.droppableProps} minHeight="100px">
                                                {
                                                    col.tasks.length > 0 ? col.tasks.map((tId, index) => {
                                                        const task = tasks[tId]
                                                        return (
                                                            <Task task={task} key={tId} tId={tId} index={index} />
                                                        )
                                                    }) : (<Text as="p" textAlign="center" fontSize="xs" color="grey">No tasks here!</Text>)
                                                }
                                                {provided.placeholder}
                                            </Box>
                                        )
                                    }
                                }
                            </Droppable>
                            <Box px={3} textAlign="right" my={4}>
                                <Button colorScheme="green" size="xs" onClick={e => onAddTaskModalOpen(cId)}>
                                    <AddIcon fontSize="0.5rem" mr={2} />
                   Task
                </Button>
                            </Box>
                        </Box>
                    )
                }
            }
        </Draggable>
    )
}

export default Column