import { Text } from '@chakra-ui/react'

export function HeaderInfo({ title, elections, selectedCity }) {
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
