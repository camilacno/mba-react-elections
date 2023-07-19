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
            {selectedCity.name}
          </Heading>
          <HStack
            px={8}
            mb={10}
            alignItems="center"
            justifyContent="space-around"
          >
            <VStack>
              <Text>Candidatos</Text>
              <Text>
                {
                  elections.filter(
                    (election) => election.cityId === selectedCity.id
                  ).length
                }
              </Text>
            </VStack>
            <VStack>
              <Text>Total de eleitores</Text>
              <Text>{formatNumber(selectedCity.votingPopulation)}</Text>
            </VStack>
            <VStack>
              <Text>Comparecimento</Text>
              <Text>{formatNumber(selectedCity.presence)}</Text>
            </VStack>
            <VStack>
              <Text>Abstenções</Text>
              <Text>{formatNumber(selectedCity.absence)}</Text>
            </VStack>
          </HStack>

          {elections
            .filter((election) => election.cityId === selectedCity.id)
            .map((election) => {
              const candidate = candidates.find(
                (candidate) => candidate.id === election.candidateId
              )
              const percentage = (election.votes / selectedCity.presence) * 100
              const elected =
                election.votes ===
                Math.max(
                  ...elections
                    .filter((e) => e.cityId === selectedCity.id)
                    .map((e) => e.votes)
                )
              return (
                <Box
                  key={election.candidateId}
                  p={4}
                  borderWidth={1}
                  borderRadius={8}
                >
                  <HStack spacing={4}>
                    <Flex></Flex>
                    <Avatar src={`/img/${candidate.username}.png`} />
                    <Text>{percentage.toFixed(2)}%</Text>
                    <Text>Votos: {formatNumber(election.votes)}</Text>
                    <Text>Nome: {candidate.name}</Text>
                    <Text color={elected ? 'green' : 'orange'}>
                      {elected ? 'Eleito' : 'Não eleito'}
                    </Text>
                  </HStack>
                </Box>
              )
            })}
        </>
      )}
    </Flex>
  )
}

export default ElectionResults
