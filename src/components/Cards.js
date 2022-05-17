import { UpDownIcon } from '@chakra-ui/icons'
import { Box, Heading, Text } from '@chakra-ui/react'
import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import db from '../config/config'

const Cards = () => {
    const [people, setPeople] = useState([])
    const [places, setPlaces] = useState([])
    const [zoneList, setZoneList] = useState([])
    const [noOfZones, setNoOfZones] = useState(0)
    const [totalPeople, setTotalPeople] = useState(0)
    const [peopleWithoutMask, setPeopleWithoutMask] = useState(0)
    const [peopleNotFollowingSocialDistancing, setPeopleNotFollowingSocialDistancing] = useState(0)

    const peopleRef = ref(db, 'covizone-9c238-default-rtdb/name')
    const placesRef = ref(db, 'placeA')
    useEffect(() => {
        const getPlaces = async () => {
            await onValue(placesRef, (snapshot) => {
                const zones = snapshot.val()
                const zoneList = []
                for (let id in zones) {
                    zoneList.push(zones[id].data)
                }
                setNoOfZones(zoneList.length)
                setZoneList(zoneList)
                const places = []
                for (let i in zoneList) {
                    for (let j in zoneList[i]) {
                        places.push(zoneList[i][j])
                    }
                }
                setPlaces(places)

                let totalPeople = 0
                for (let i in places) {
                    totalPeople = totalPeople + places[i].total
                }
                setTotalPeople(totalPeople)

                let peopleWithoutMask = 0
                for (let i in places) {
                    peopleWithoutMask = peopleWithoutMask + places[i].mask
                }
                setPeopleWithoutMask(peopleWithoutMask)

                let peopleNotFollowingSocialDistancing = 0
                for (let i in places) {
                    peopleNotFollowingSocialDistancing = peopleNotFollowingSocialDistancing + places[i].socialD

                }
                setPeopleNotFollowingSocialDistancing(peopleNotFollowingSocialDistancing)
            })
        }

        const getPeople = async () => {
            await onValue(peopleRef, (snapshot) => {
                const data = snapshot.val()
                setPeople(data)
            })
        }

        getPlaces()
        calcMaskPercentage()
        calcSocialDistancingPercentage()
        getPeople()
    }, [])

    const calcMaskPercentage = () => {
        if (peopleWithoutMask) {
            const percentage = (peopleWithoutMask / totalPeople) * 100
            return percentage.toFixed(2)
        } else {
            return 0
        }
    }

    const calcSocialDistancingPercentage = () => {
        if (peopleNotFollowingSocialDistancing) {
            const percentage = (peopleNotFollowingSocialDistancing / totalPeople) * 100
            return percentage.toFixed(2)
        } else {
            return 0
        }
    }

    return (
        <Box
            w={{ base: '100%', md: '96%', lg: '80%' }}
            m={'auto'}
            p={{ base: '6rem 0.2rem', md: '6rem 2rem' }}
            bg='white'
            borderRadius={{ base: '2rem', md: '4rem 4rem' }}
            cursor={'context-menu'}
        >
            <Heading as='h2' size='xl'
                textAlign={'center'}
                fontFamily={'Poppins'}
                m={'0 0 2rem 0'}
                cursor={'context-menu'}
            >
                Zonal Statistics
                <UpDownIcon
                    ml={'1rem'}
                    transition='all 0.3s ease-in-out'
                    _hover={{
                        transform: 'translateY(-0.5rem)',
                    }}
                />
            </Heading>
            <Box
                d={'flex'}
                p={{ base: '3rem 1rem 0 1rem', md: '3rem 2rem 0 2rem' }}
                justifyContent={'space-between'}
                gap={'3rem'}
                flexDirection={{ base: 'column', md: 'row' }}
            >
                <Box
                    w={{ base: '100%', md: '48%' }}
                    d={'flex'}
                    gap={'0.5rem'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    h={'20rem'}
                    p={'2rem'}
                    bg='white'
                    border='1px solid #e0e0e0'
                    borderTop='5px solid hsl(34, 97%, 64%)'
                    borderRadius={'1rem'}
                    boxShadow={'0 0.5rem 1rem rgba(0, 0, 0, 0.15)'}
                    transition={'all 0.2s ease-in-out'}
                    _hover={{
                        transform: 'scale(1.02)'
                    }}
                >
                    <Heading as='h3' size='lg'
                        fontFamily={'Poppins'}
                    >
                        People
                    </Heading>
                    <Heading as='h2' size='2xl'
                        fontFamily={'Poppins'}
                        color='hsl(34, 97%, 64%)'
                    >
                        {totalPeople}
                    </Heading>
                    <Text
                        fontFamily={'Poppins'}
                    >
                        Total number of individuals scanned by the algorithm.
                    </Text>
                </Box>
                <Box
                    w={{ base: '100%', md: '48%' }}
                    d={'flex'}
                    gap={'0.5rem'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    h={'20rem'}
                    bg='white'
                    border='1px solid #e0e0e0'
                    borderTop='5px solid hsl(180, 62%, 55%)'
                    p={'2rem'}
                    borderRadius={'1rem'}
                    boxShadow={'0 0.5rem 1rem rgba(0, 0, 0, 0.15)'}
                    transition={'all 0.2s ease-in-out'}
                    _hover={{
                        transform: 'scale(1.02)'
                    }}
                >
                    <Heading as='h3' size='lg'
                        fontFamily={'Poppins'}
                    >
                        Zones
                    </Heading>
                    <Heading as='h2' size='2xl'
                        fontFamily={'Poppins'}
                        color='hsl(180, 62%, 55%)'
                    >
                        {noOfZones}
                    </Heading>
                    <Text
                        fontFamily={'Poppins'}
                    >
                        Total number of zones the algorithm is collecting data from.
                    </Text>
                </Box>
            </Box>
            <Box
                d={'flex'}
                p={{ base: '3rem 1rem 0 1rem', md: '3rem 2rem 0 2rem' }}
                justifyContent={'space-between'}
                gap={'3rem'}
                flexDirection={{ base: 'column', md: 'row' }}
            >
                <Box
                    w={{ base: '100%', md: '48%' }}
                    d={'flex'}
                    gap={'0.5rem'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    h={'20rem'}
                    bg='white'
                    border='1px solid #e0e0e0'
                    borderTop='5px solid hsl(212, 86%, 64%)'
                    p={'2rem'}
                    borderRadius={'1rem'}
                    boxShadow={'0 0.5rem 1rem rgba(0, 0, 0, 0.15)'}
                    transition={'all 0.2s ease-in-out'}
                    _hover={{
                        transform: 'scale(1.02)'
                    }}
                >
                    <Heading as='h3' size='lg'
                        fontFamily={'Poppins'}
                    >
                        People without Mask
                    </Heading>
                    <Heading as='h2' size='2xl'
                        fontFamily={'Poppins'}
                        color='hsl(212, 86%, 64%)'
                    >
                        {peopleWithoutMask}
                    </Heading>
                    {/* <Text
                        fontFamily={'Poppins'}
                        color='gray.400'
                    >
                        Under development
                    </Text> */}
                    <Text
                        fontFamily={'Poppins'}
                    >
                        Total number of people identified by the model that are not wearing mask.
                    </Text>
                </Box>
                <Box
                    w={{ base: '100%', md: '48%' }}
                    d={'flex'}
                    gap={'0.5rem'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    h={'20rem'}
                    bg='white'
                    border='1px solid #e0e0e0'
                    borderTop='5px solid #8e00b9'
                    p={'2rem'}
                    borderRadius={'1rem'}
                    boxShadow={'0 0.5rem 1rem rgba(0, 0, 0, 0.15)'}
                    transition={'all 0.2s ease-in-out'}
                    _hover={{
                        transform: 'scale(1.02)'
                    }}
                >
                    <Heading as='h3' size='lg'
                        fontFamily={'Poppins'}
                    >
                        People not following Social Distancing
                    </Heading>
                    <Heading as='h2' size='2xl'
                        fontFamily={'Poppins'}
                        color='#8e00b9'
                    >
                        {peopleNotFollowingSocialDistancing}
                    </Heading>
                    {/* <Text
                        fontFamily={'Poppins'}
                        color='gray.400'
                    >
                        Under development
                    </Text> */}
                    <Text
                        fontFamily={'Poppins'}
                    >
                        Total number of people identified by the model that are not following social distancing.
                    </Text>
                </Box>
                {/* <Box
                    w={{ base: '100%', md: '48%' }}
                    d={'flex'}
                    gap={'0.5rem'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    h={'20rem'}
                    bg='white'
                    border='1px solid #e0e0e0'
                    borderTop='5px solid hsl(0, 78%, 62%)'
                    p={'2rem'}
                    borderRadius={'1rem'}
                    boxShadow={'0 0.5rem 1rem rgba(0, 0, 0, 0.15)'}
                    transition={'all 0.2s ease-in-out'}
                    _hover={{
                        transform: 'scale(1.02)'
                    }}
                >
                    <Heading as='h3' size='lg'
                        fontFamily={'Poppins'}
                    >
                        Percentage of People without Mask
                    </Heading>
                    <Heading as='h2' size='2xl'
                        fontFamily={'Poppins'}
                        color='hsl(0, 78%, 62%)'
                    >
                        {calcMaskPercentage()}%
                    </Heading>
                    <Text
                        fontFamily={'Poppins'}
                        color='gray.400'
                    >
                        Under development
                    </Text>
                    <Text
                        fontFamily={'Poppins'}
                    >
                        Percentage of people identified by the model that are not wearing mask.
                    </Text>
                </Box> */}
            </Box>
            {/* <Box
                d={'flex'}
                p={{ base: '3rem 1rem 0 1rem', md: '3rem 2rem 0 2rem' }}
                justifyContent={'space-between'}
                gap={'3rem'}
                flexDirection={{ base: 'column', md: 'row' }}
            >

                <Box
                    w={{ base: '100%', md: '48%' }}
                    d={'flex'}
                    gap={'0.5rem'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    h={'20rem'}
                    bg='white'
                    border='1px solid #e0e0e0'
                    borderTop='5px solid #3b7d00'
                    p={'2rem'}
                    borderRadius={'1rem'}
                    boxShadow={'0 0.5rem 1rem rgba(0, 0, 0, 0.15)'}
                    transition={'all 0.2s ease-in-out'}
                    _hover={{
                        transform: 'scale(1.02)'
                    }}
                >
                    <Heading as='h3' size='lg'
                        fontFamily={'Poppins'}
                    >
                        Percentage of People not following Social Distancing
                    </Heading>
                    <Heading as='h2' size='2xl'
                        fontFamily={'Poppins'}
                        color='#3b7d00'
                    >
                        {calcSocialDistancingPercentage()}%
                    </Heading>
                    <Text
                        fontFamily={'Poppins'}
                        color='gray.400'
                    >
                        Under development
                    </Text>
                    <Text
                        fontFamily={'Poppins'}
                    >
                        Percentage of people identified by the model that are not following social distancing.
                    </Text>
                </Box>
            </Box> */}
        </Box >
    )
}

export default Cards
