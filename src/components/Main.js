import { Box, Button, Heading, Image, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'

const Main = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const tl = useRef()
    const headingBox = useRef()
    const contentBox = useRef()
    const logoImage = useRef()

    useEffect(() => {
        tl.current = gsap.timeline(
            {
                defaults: {
                    duration: 0.6,
                }
            }
        )
            .fromTo
            (
                headingBox.current,
                {
                    opacity: 0,
                    y: 100,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                },
            )
            .fromTo(
                contentBox.current,
                {
                    opacity: 0,
                    y: 100,
                },
                {
                    opacity: 1,
                    y: 0,
                }
            )
            .fromTo(
                logoImage.current,
                {
                    y: 0
                },
                {
                    y: -10,
                    repeat: -1,
                    yoyo: true,
                }
            )
    }, [])


    return (
        <Box className='main'
            w={{ base: '100%', md: '96%', lg: '80%' }}
            m={{ base: '4rem auto', md: '8rem auto' }}
            p={2}

        >
            <Box
                ref={headingBox}
            >
                <Heading
                    as='h2'
                    size='4xl'
                    textAlign={'center'}
                    fontFamily='Poppins'
                    m={'1rem 0'}
                    bgClip='text'
                    bgGradient='linear(to-br, #ffae00, #f12711)'
                    cursor={'context-menu'}
                    pb={'2rem'}
                >
                    &lt;CoviZone&gt;
                </Heading>
                {/* <Text fontSize='3xl'
                    textAlign={'center'}
                    fontFamily='Poppins'
                    color='#4a93f8'
                    m={'1rem auto'}
                    fontWeight='500'
                    w={{ base: '100%', md: '60%' }}
                    bg='gray.100'
                    w='fit-content'
                    p={'0.6rem 1rem'}
                    rounded='full'
                    cursor={'context-menu'}
                >
                    by
                </Text> */}
                {/* <Box
                    d='flex'
                    justifyContent='center'
                    alignItems='center'
                    transform={{ base: 'translateY(-1rem)', md: 'translateY(-2rem)' }}
                    flexDirection={{ base: 'column', md: 'row' }}
                >
                    <Image
                        ref={logoImage}
                        borderRadius='full'
                        boxSize='150px'
                        src='https://i.ibb.co/tBvR4Yv/logo.png'
                        alt='HamckerBazz'
                    />
                    <Heading as='h4' size='xl'
                        fontFamily='Poppins'
                        color='white'
                        cursor={'context-menu'}
                    >
                        HamckerBazz
                    </Heading>
                </Box> */}
            </Box>
            <Box
                ref={contentBox}
                w={{ base: '100%', md: '60%' }}
                m={'auto'}
                p={{ base: '1rem', md: '2rem' }}
                borderRadius={{ base: '0.5rem', md: '2rem' }}
                backdropBlur={'blur(24px) saturate(180%)'}
                bg='rgba(17, 25, 40, 0.75)'
                border='1px solid rgba(255, 255, 255, 0.125)'
            >
                <Text fontSize='lg'
                    textAlign={'center'}
                    fontFamily='Poppins'
                    color='white'
                    m={'1rem auto'}
                    cursor={'context-menu'}
                >
                    This project makes extensive use of Machine Learning to detect the people wandering without mask in order to spread awareness about the ongoing pandemic crisis. The project is in development and your suggestions to improve this project are always welcome.
                </Text>
                <Box
                    d='flex'
                    justifyContent='center'
                    p={'1rem'}
                >
                    <Button onClick={onOpen}
                        fontFamily='Poppins'
                        fontWeight={'600'}
                        fontSize={'1.5rem'}
                        borderRadius='0.5rem'
                        color={'white'}
                        bgGradient='linear(to-br, #ffae00, #f12711)'
                        p={'1.8rem 2.5rem'}
                        _active={{
                            transform: 'scale(0.95)'
                        }}
                        _hover={{
                            transform: 'translateY(-0.5rem)',
                        }}
                    >
                        Quote Us
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}
                        m={'auto'}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader
                                fontFamily='Poppins'
                            >Quote Us</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody
                                fontFamily={'Poppins'}
                            >
                                Do you think this project is lit🔥? Or do you any suggestions to improve this model😍? Write to us at
                                &nbsp;
                                <Link color='blue.500' href='mailto:nqu7069@gmail.com'>
                                    nqu7069@gmail.com
                                </Link>
                                .
                            </ModalBody>
                            <ModalFooter>
                                <Link color='blue.500' href='mailto:nqu7069@gmail.com'>
                                    <Button variant='ghost'
                                        color={'blue.500'}
                                        fontFamily='Poppins'
                                        fontWeight={'400'}
                                    >Write e-Mail</Button>
                                </Link>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            </Box>
        </Box >
    )
}

export default Main
