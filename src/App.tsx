import { useState, useEffect } from 'react'
import { Heading, Text, VStack, HStack, Flex, Grid } from '@chakra-ui/react'

import { api } from './services/api'

import { CitySelector, CandidateCard, HeaderInfoCard } from './components/index'
import { formatNumber } from './helpers'

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

type CandidateProps = {
  id: string
  username: string
  name: string
}

function ElectionResults() {
  const [elections, setElections] = useState<ElectionProps[]>([])
  const [candidates, setCandidates] = useState<CandidateProps[]>([])
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
          <Heading
            textAlign="center"
            my={10}
            size="lg"
            bg="teal.500"
            py={3}
            color="white"
          >
            Eleição em {selectedCity.name}
          </Heading>

          <HStack
            px={8}
            mb={10}
            alignItems="center"
            justifyContent="center"
            gap="5rem"
          >
            <HeaderInfoCard
              title="Candidatos"
              value={
                elections.filter(
                  (election) => election.cityId === selectedCity.id
                ).length
              }
            />
            <HeaderInfoCard
              title="Total de eleitores"
              value={formatNumber(selectedCity.votingPopulation)}
            />
            <HeaderInfoCard
              title="Comparecimento"
              value={formatNumber(selectedCity.presence)}
            />
            <HeaderInfoCard
              title="Abstenções"
              value={formatNumber(selectedCity.absence)}
            />
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
                    key={candidate?.id}
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
