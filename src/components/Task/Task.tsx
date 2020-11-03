import { Box, Flex, Heading, Text } from '@chakra-ui/core'
import { DragHandleIcon } from '@chakra-ui/icons'
import React from 'react'
import { Task as _task } from '../../interfaces'

interface Props {
    task: _task
}
const Task = (props: Props) => {
    const {task} = props
    return (

        <Flex px={3} py={2} alignItems="center">
            <DragHandleIcon mr={2} />
            <Box>
                <Heading size="xs">{task.title}</Heading>
                <Text as="p" fontSize="xs">{task.body}</Text>
            </Box>
        </Flex>
    )
}

export default Task