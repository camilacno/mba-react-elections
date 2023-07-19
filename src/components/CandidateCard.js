import { Avatar, Card, Flex, Text, VStack } from '@chakra-ui/react'
import { formatNumber } from '../helpers'

export function CandidateCard({ election, candidate, elected, percentage }) {
  return (
    <Card
      variant="elevated"
      key={election.candidateId}
      p={4}
      borderRadius={4}
      w={220}
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
}
