import { Flex, Select, Text } from '@chakra-ui/react'

import { styled } from 'styled-components'

type CityProps = {
  id: string
  name: string
}

type CitySelectorPops = {
  selectedCityId: string
  cities: CityProps[]
  setSelectedCityId: (id: string) => void
}

export function CitySelector({
  selectedCityId,
  cities,
  setSelectedCityId,
}: CitySelectorPops) {
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
        <Option value="">--Selecione uma cidade--</Option>
        {cities.map((city) => (
          <Option key={city.id} value={city.id}>
            {city.name}
          </Option>
        ))}
      </Select>
    </Flex>
  )
}

export const Option = styled.option``
