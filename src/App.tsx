// @ts-expect-error
import { Heading, Text, VStack, HStack, Flex, Grid } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

import { api } from './lib/axios'

import { CitySelector } from './components/CitySelector'
import { formatNumber } from './helpers'
import { CandidateCard } from './components/CandidateCard'

type CityProps = {
  id: string
  name: string
  votingPopulation: number
  absence: number
  presence: number
}

type ElectionProps = {
  id: string
  cityId: string
  candidateId: string
  votes: number
}

type CandidatesProps = {
  id: string
  name: string
  username: number
}

function ElectionResults() {
  const [elections, setElections] = useState<ElectionProps[]>([])
  const [candidates, setCandidates] = useState<CandidatesProps[]>([])
  const [cities, setCities] = useState<CityProps[]>([])
  const [selectedCityId, setSelectedCityId] = useState('')

  async function fetchElections() {
    const response = await api.get('/election')
    setElections(response.data)
  }

  async function fetchCandidates() {
    const response = await api.get('/candidates')
    setCandidates(response.data)
  }

  async function fetchCities() {
    const response = await api.get('/cities')
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
      <CitySelector
        cities={cities}
        selectedCityId={selectedCityId}
        setSelectedCityId={setSelectedCityId}
      />

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
            templateColumns="repeat(auto-fit, minmax(220px, 1fr))"
            gap={6}
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
                  <CandidateCard
                    candidate={candidate}
                    elected={elected}
                    election={election}
                    percentage={percentage}
                  />
                )
              })}
          </Grid>
        </>
      )}
    </Flex>
  )
}

export default ElectionResults
