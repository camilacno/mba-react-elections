import { Avatar, Card, Flex, Text, VStack } from '@chakra-ui/react'
import { formatNumber } from '../helpers'

type ElectionProps = {
  candidateId: string
  votes: number
}

type CandidateProps = {
  name: string
  username: string
  id: string
}

type CandidateCardProps = {
  election: ElectionProps
  candidate?: CandidateProps
  elected: boolean
  percentage: number
}
export function CandidateCard({
  election,
  candidate,
  elected,
  percentage,
}: CandidateCardProps) {
  return (
    <>
      {candidate && (
        <Card
          variant="elevated"
          key={election.candidateId}
          p={4}
          borderRadius={4}
          w={220}
          bg="gray.50"
        >
          <VStack spacing={4}>
            <Flex
              w="100%"
              px={3}
              alignItems="center"
              justifyContent="space-between"
            >
              <Avatar src={`/img/${candidate?.username}.png`} />
              <VStack align="end" gap={0}>
                <Text
                  color={elected ? 'green' : 'orange'}
                  fontSize="sm"
                  fontWeight="bold"
                >
                  {percentage.toFixed(2)}%
                </Text>
                <Text fontSize="sm" fontWeight="bold">
                  {formatNumber(election.votes)} votos
                </Text>
              </VStack>
            </Flex>
            <Text fontSize="lg" fontWeight="bold">
              {candidate?.name}
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
      )}
    </>
  )
}
