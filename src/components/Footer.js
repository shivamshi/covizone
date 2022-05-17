import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
    return (
        <Box
            w={{ base: '100%', md: '96%', lg: '80%' }}
            m={'auto'}
            color='white'
            p={'2rem 0'}
            fontFamily={'Poppins'}
            d='flex'
            justifyContent={'space-between'}
            cursor='context-menu'
            alignItems={'center'}
            flexDir={{ base: 'column', md: 'row' }}
        >
            <Text>
                Made with ❤️ by HamckerBazz
            </Text>
            <Text>
                &copy; HamckerBazz {new Date().getFullYear()}
            </Text>
        </Box>
    )
}

export default Footer