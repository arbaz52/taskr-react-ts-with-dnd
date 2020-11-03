import React from 'react'
import {Flex, Text } from "@chakra-ui/core"

const Header = () => {
    return (
        <Flex px={4} py={2} as='header' justifyContent="space-between" alignItems="center">
            <Text as="b">taskr.</Text>
        </Flex>
    )
}

export default Header