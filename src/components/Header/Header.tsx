import React from 'react'
import { Box, Button, Flex, Text } from "@chakra-ui/core"
import { HamburgerIcon } from '@chakra-ui/icons'

const Header = () => {
    return (
        <Flex px={4} py={2} as='header' justifyContent="space-between" alignItems="center">
            <Text as="b">taskr.</Text>
            <Button size="sm">
                <HamburgerIcon />
            </Button>
        </Flex>
    )
}

export default Header