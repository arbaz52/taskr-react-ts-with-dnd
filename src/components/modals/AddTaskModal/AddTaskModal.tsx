import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, Input, ModalFooter, Button, Textarea } from '@chakra-ui/core'
import React, { useState } from 'react'



interface Props {
    isOpen: boolean;
    onClose: () => void;
    addTask: (title: string, body: string, added_at: Date) => void;
}
const AddTaskModal = (props: Props) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const { isOpen, onClose, addTask } = props
    const _addTask = (e: any) => {
        addTask(title, body, new Date())
        setTitle("")
        setBody("")
        onClose()
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a new Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <Input placeholder="Task title" value={title} onChange={e=>setTitle(e.target.value)}/>
                <Textarea placeholder="Task Description | Content" value={body} onChange={e=>setBody(e.target.value)}/>
                <Text as="p" fontSize="sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, repellendus.
              </Text>
              </Stack>
            </ModalBody>
  
            <ModalFooter>
              <Button size="sm" colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button size="sm" variant="ghost" onClick={_addTask}>Add Task</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
}

export default AddTaskModal