import { Flex, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react'
import { TopArtistProfile } from '../../../types'

type TopArtistInfoProps = {
  artistInfo: TopArtistProfile;
}

const TopArtistInfo = ({artistInfo}: TopArtistInfoProps) => {
  return (
    <Stack>
      <Flex>
        <Image src={artistInfo.images[0]?.url} alt={artistInfo.name} height={40} width={40} objectFit='cover' />
        <Stack>
          <Text>{artistInfo.name}</Text>
          <Text>{artistInfo.popularity}%</Text>
          <Text>{artistInfo.followers.total}</Text>
        </Stack>
      </Flex>
    </Stack>
  )
}

export default TopArtistInfo