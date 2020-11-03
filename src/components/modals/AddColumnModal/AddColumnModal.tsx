import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, Input, ModalFooter, Button } from '@chakra-ui/core'
import React, { useState } from 'react'

interface Props {
    isOpen: boolean;
    onClose: () => void;
    addColumn: (title: string) => void;
}
const AddColumnModal = (props: Props) => {
    const [title, setTitle] = useState("")
    const { isOpen, onClose, addColumn } = props
    const _addColumn = (e: any) => {
        addColumn(title)
        setTitle("")
        onClose()
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add a new Column</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack>
                        <Input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}/>
                        <Text as="p" fontSize="sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, repellendus.
        </Text>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button size="sm" colorScheme="red" mr={3} onClick={onClose}>
                        Close
        </Button>
                    <Button size="sm" variant="ghost" onClick={_addColumn}>Add Column</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddColumnModal