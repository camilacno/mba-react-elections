// @ts-expect-error
import { Text } from '@chakra-ui/react'

interface HeaderInfoProps {
  title: string
  elections: { cityId: string }[]
  selectedCity: { id: string }
}

export function HeaderInfo({
  title,
  elections,
  selectedCity,
}: HeaderInfoProps) {
  return (
    <>
      {' '}
      <Text fontSize="sm" fontWeight="semibold">
        {title}
      </Text>
      <Text fontSize="sm" fontWeight="thin">
        {
          elections.filter((election) => election.cityId === selectedCity.id)
            .length
        }
      </Text>
    </>
  )
}
