import { Text, VStack } from '@chakra-ui/react'

type HeaderInfoCardProps = {
  title: string
  value: number | string
}
export function HeaderInfoCard({ title, value }: HeaderInfoCardProps) {
  return (
    <VStack bg="gray.50" borderRadius={5} p={4}>
      <Text fontSize="sm" fontWeight="semibold">
        {title}
      </Text>
      <Text fontSize="sm" fontWeight="thin">
        {value}
      </Text>
    </VStack>
  )
}
