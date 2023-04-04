import { Box } from '@chakra-ui/react'
import React from 'react'
import ArtistProfileSection from './ArtistProfileSection'

type Props = {}

const ArtistProfilePage = (props: Props) => {
  return (
    <Box maxW={'100vw'}>
      <ArtistProfileSection />
    </Box>
  )
}

export default ArtistProfilePage