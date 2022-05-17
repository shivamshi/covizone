import { EditIcon } from '@chakra-ui/icons'
import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import db from '../config/config'

const Chart = () => {
    const [places, setPlaces] = useState([])
    const [zoneList, setZoneList] = useState([])
    const [totalPeopleArray, setTotalPeopleArray] = useState([])
    const [peopleWithoutMaskArray, setPeopleWithoutMaskArray] = useState([])
    const [peopleSocialDistancing, setPeopleSocialDistancing] = useState([])
    const [zonesArray, setZonesArray] = useState([])
    const [uniqueZonesArray, setUniqueZonesArray] = useState([])

    const placesRef = ref(db, 'placeA')
    useEffect(() => {
        const getPlaces = async () => {
            await onValue(placesRef, (snapshot) => {
                const zones = snapshot.val()
                const zoneList = []
                for (let id in zones) {
                    zoneList.push(zones[id].data)
                }
                setZoneList(zoneList)
                const places = []
                for (let i in zoneList) {
                    for (let j in zoneList[i]) {
                        places.push(zoneList[i][j])
                    }
                }
                setPlaces(places)

                const zonesArray = []
                for (let i in places) {
                    zonesArray.push(places[i].zone)
                }
                const uniqueZonesArray = [...new Set(zonesArray)]
                setUniqueZonesArray(uniqueZonesArray)
                setZonesArray(uniqueZonesArray)

                const totalPeopleArray = []
                for (let i in uniqueZonesArray) {
                    let sumOfPeople = []
                    for (let j in places) {
                        if (uniqueZonesArray[i] === places[j].zone) {
                            sumOfPeople.push(places[j].total)
                        }
                    }
                    totalPeopleArray.push(sumOfPeople.pop())
                }
                setTotalPeopleArray(totalPeopleArray)

                const peopleWithoutMaskArray = []
                for (let i in uniqueZonesArray) {
                    let sumOfPeopleWithoutMask = []
                    for (let j in places) {
                        if (uniqueZonesArray[i] === places[j].zone) {
                            sumOfPeopleWithoutMask.push(places[j].mask)
                        }
                    }
                    peopleWithoutMaskArray.push(sumOfPeopleWithoutMask.pop())
                }
                setPeopleWithoutMaskArray(peopleWithoutMaskArray)

                const peopleSocialDistancingArray = []
                for (let i in uniqueZonesArray) {
                    let sumOfSocialDistancing = []
                    for (let j in places) {
                        if (uniqueZonesArray[i] === places[j].zone) {
                            sumOfSocialDistancing.push(places[j].socialD)
                        }
                    }
                    peopleSocialDistancingArray.push(sumOfSocialDistancing.pop())
                }
                setPeopleSocialDistancing(peopleSocialDistancingArray)
            })
        }
        getPlaces()
    }, [])

    return (
        <Box
            w={{ base: '100%', md: '96%', lg: '80%' }}
            m={'auto'}
            bg='#1967d2'
            p={{ base: '0 1rem 4rem 1rem', md: '0 0 4rem 0' }}
        >
            <Heading as='h2' size='xl'
                textAlign={'center'}
                fontFamily={'Poppins'}
                color='#fff'
                m={'2rem 0'}
                p={'1rem 0'}
                cursor={'context-menu'}
            >
                Graph
                <EditIcon
                    ml={'1rem'}
                    transition='all 0.3s ease-in-out'
                    _hover={{
                        transform: 'translateY(-0.5rem)',
                    }}
                />
            </Heading>
            <Box
                bg='white'
                p={{ base: '1rem', md: '2rem' }}
                borderRadius={{ base: '0.5rem', md: '2rem' }}
            >
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList
                        w={{ base: '100%', md: '80%', lg: '60%' }}
                        m={'auto'}
                    >
                        <Tab
                            w={'50%'}
                        >Bar Chart</Tab>
                        <Tab
                            w={'50%'}
                        >Line chart</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {totalPeopleArray.length > 0 ? (
                                <>
                                    <Bar
                                        data={{
                                            labels: uniqueZonesArray,
                                            datasets: [{
                                                label: 'Total People',
                                                data: totalPeopleArray,
                                                backgroundColor: 'hsl(34, 97%, 64%)',
                                            },
                                            {
                                                label: 'People Without Mask',
                                                data: peopleWithoutMaskArray,
                                                backgroundColor: 'hsl(0, 78%, 62%)',
                                            },
                                            {
                                                label: 'People not following Social Distancing',
                                                data: peopleSocialDistancing,
                                                backgroundColor: '#8e00b9',
                                            }
                                            ]
                                        }}
                                    />
                                </>
                            ) : (
                                <Text
                                    textAlign={'center'}
                                    fontFamily={'Poppins'}
                                    m={'1rem 0'}
                                    p={'4rem 0'}
                                    bg='gray.100'
                                    borderRadius={'1rem'}
                                    cursor={'context-menu'}
                                >
                                    No data to display.
                                </Text>
                            )}
                        </TabPanel>
                        <TabPanel>
                            {totalPeopleArray.length > 0 ? (
                                <Line
                                    data={{
                                        labels: uniqueZonesArray,
                                        datasets: [{
                                            label: 'Total People',
                                            data: totalPeopleArray,
                                            backgroundColor: 'hsl(34, 97%, 64%)',
                                        },
                                        {
                                            label: 'People Without Mask',
                                            data: peopleWithoutMaskArray,
                                            backgroundColor: 'hsl(0, 78%, 62%)',
                                        },
                                        {
                                            label: 'People not following Social Distancing',
                                            data: peopleSocialDistancing,
                                            backgroundColor: '#8e00b9',
                                        }
                                        ]
                                    }}
                                />
                            ) : (
                                <Text
                                    textAlign={'center'}
                                    fontFamily={'Poppins'}
                                    m={'1rem 0'}
                                    p={'4rem 0'}
                                    bg='gray.100'
                                    borderRadius={'1rem'}
                                    cursor={'context-menu'}
                                >
                                    No data to display.
                                </Text>
                            )}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    )
}

export default Chart