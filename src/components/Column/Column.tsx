import { Box, Button, Flex, Heading, HStack, Input, Text } from '@chakra-ui/core'
import { AddIcon, DeleteIcon, DragHandleIcon, EditIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import Task from '../Task/Task'
import { Column as _col, Task as _task, Tasks } from './../../interfaces'

interface Props {
    cId: string;
    col: _col;
    tasks: Tasks;
    updateTitle: ((id: string, title: string) => void);
    deleteTitle: (id: string) => void
}
const Column = (props: Props) => {
    const [editTitle, setEditTitle] = useState(false)

    const { cId, col, tasks, updateTitle, deleteTitle } = props
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

        <Box key={cId} w={300} m={3} boxShadow="0 0 10px #999">
            <Flex px={3} py={2} justifyContent="space-between" justifyItems="center">
                <Flex alignItems="center">
                    <DragHandleIcon mr={2} />
                    {
                        !editTitle ? (<Heading size="sm">{col.title}</Heading>) : (
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
            <Box>
                {
                    col.tasks.map(tId => {
                        const task = tasks[tId]
                        return (
                            <Task task={task} key={tId} />
                        )
                    })
                }
            </Box>
            <Box px={3} textAlign="right" my={4}>
                <Button colorScheme="pink" size="xs">
                    <AddIcon fontSize="0.5rem" mr={2} />
           Task
        </Button>
            </Box>
        </Box>
    )
}

export default Column