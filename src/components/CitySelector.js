import { Flex, Select, Text } from '@chakra-ui/react'

export function CitySelector({ selectedCityId, cities, setSelectedCityId }) {
  return (
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
  )
}
