import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Box,
  Heading,
  Text,
  Select,
  Avatar,
  VStack,
  HStack,
  Flex,
  Grid,
  Card,
} from '@chakra-ui/react'

function ElectionResults() {
  const [elections, setElections] = useState([])
  const [candidates, setCandidates] = useState([])
  const [cities, setCities] = useState([])
  const [selectedCityId, setSelectedCityId] = useState('')

  function formatNumber(value) {
    return new Intl.NumberFormat('pt-BR').format(value)
  }

  async function fetchElections() {
    const response = await axios.get('http://localhost:3001/election')
    setElections(response.data)
  }

  async function fetchCandidates() {
    const response = await axios.get('http://localhost:3001/candidates')
    setCandidates(response.data)
  }

  async function fetchCities() {
    const response = await axios.get('http://localhost:3001/cities')
    setCities(response.data)
  }

  useEffect(() => {
    fetchElections()
    fetchCandidates()
    fetchCities()
  }, [])

  const selectedCity = cities.find((city) => city.id === selectedCityId)

  return (
    <Flex flexDir="column" py={8}>
      <Flex alignItems="center" justifyContent="center">
        <Text fontSize="large" fontWeight="bold" mr={2}>
          Selecione uma cidade:
        </Text>
        <Select
          width="30%"
          variant="filled"
          id="city-select"
          value={selectedCityId}
          onChange={(e) => setSelectedCityId(e.target.value)}
        >
          <option value="">--Selecione uma cidade--</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </Select>
      </Flex>

      {selectedCity && (
        <>
          <Heading textAlign="center" my={10} size="lg">
            Eleição em {selectedCity.name}
          </Heading>
          <HStack
            px={8}
            mb={10}
            alignItems="center"
            justifyContent="space-around"
          >
            <VStack>
              <Text fontSize="sm" fontWeight="semibold">
                Candidatos
              </Text>
              <Text fontSize="sm" fontWeight="thin">
                {
                  elections.filter(
                    (election) => election.cityId === selectedCity.id
                  ).length
                }
              </Text>
            </VStack>
            <VStack>
              <Text fontSize="sm" fontWeight="semibold">
                Total de eleitores
              </Text>
              <Text fontSize="sm" fontWeight="thin">
                {formatNumber(selectedCity.votingPopulation)}
              </Text>
            </VStack>
            <VStack>
              <Text fontSize="sm" fontWeight="semibold">
                Comparecimento
              </Text>
              <Text fontSize="sm" fontWeight="thin">
                {formatNumber(selectedCity.presence)}
              </Text>
            </VStack>
            <VStack>
              <Text fontSize="sm" fontWeight="semibold">
                Abstenções
              </Text>
              <Text fontSize="sm" fontWeight="thin">
                {formatNumber(selectedCity.absence)}
              </Text>
            </VStack>
          </HStack>

          <Grid
            templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            gap={6}
            mx="auto"
            px={8}
            py={4}
            justifyContent="center"
          >
            {elections
              .filter((election) => election.cityId === selectedCity.id)
              .map((election) => {
                const candidate = candidates.find(
                  (candidate) => candidate.id === election.candidateId
                )
                const percentage =
                  (election.votes / selectedCity.presence) * 100
                const elected =
                  election.votes ===
                  Math.max(
                    ...elections
                      .filter((e) => e.cityId === selectedCity.id)
                      .map((e) => e.votes)
                  )
                return (
                  <Card
                    variant="elevated"
                    key={election.candidateId}
                    p={4}
                    borderRadius={4}
                    w={300}
                  >
                    <VStack spacing={4}>
                      <Flex
                        w="100%"
                        px={3}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Avatar src={`/img/${candidate.username}.png`} />
                        <VStack align="end" gap={0}>
                          <Text fontSize="sm" fontWeight="bold">
                            {percentage.toFixed(2)}%
                          </Text>
                          <Text fontSize="sm" fontWeight="bold">
                            {formatNumber(election.votes)} votos
                          </Text>
                        </VStack>
                      </Flex>
                      <Text fontSize="lg" fontWeight="bold">
                        {candidate.name}
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color={elected ? 'green' : 'orange'}
                      >
                        {elected ? 'Eleito' : 'Não eleito'}
                      </Text>
                    </VStack>
                  </Card>
                )
              })}
          </Grid>
        </>
      )}
    </Flex>
  )
}

export default ElectionResults
