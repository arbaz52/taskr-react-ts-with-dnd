import { Box, Button, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/core'
import { DeleteIcon, DragHandleIcon, ViewIcon } from '@chakra-ui/icons'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Task as _task } from '../../interfaces'

interface Props {
    tId: string;
    index: number;
    task: _task;
}
const Task = (props: Props) => {
    const { task, tId, index } = props
    return (
        <Draggable draggableId={tId} index={index}>
            {
                (provided, snapshot) => {
                    return (
                        <Box ref={provided.innerRef} {...provided.draggableProps} px={3} py={2} mb={1}>
                            <Flex alignItems="center" justifyContent="space-between">
                                <Box {...provided.dragHandleProps}><DragHandleIcon mr={2} /></Box>
                                <Box flex={1} mr={2} overflow="hidden">
                                    <Heading size="xs">{task.title}</Heading>
                                    <Text as="p" fontSize="xs" isTruncated w="100%">{task.body}</Text>
                                </Box>
                                {/* 
                    <Stack style={{ justifyContent: "flex-end" }}>
                        <Button size="xs">
                            <DeleteIcon/>
                        </Button>
                        <Button size="xs">
                            <ViewIcon/>
                        </Button>
                    </Stack>
                     */}
                            </Flex>
                        </Box>
                    )
                }
            }
        </Draggable>
    )
}

export default Task