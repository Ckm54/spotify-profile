import { Box, Flex, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Playlist } from '../../../../types'

type PlaylistCardProps = {
  playlist: Playlist
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  return (
    <Stack justifyContent={'center'} cursor='pointer' p={4} borderRadius={10} bg='gray.800' transition={'all 0.32s ease'} _hover={{bg: 'gray.900'}} >
      <Image src={playlist.images[0]?.url} alt={playlist.name} h={'200'} w={'100%'} />
      <Flex justifyContent={'flex-start'}>
      <Text fontSize={'11pt'} mt={2}>{playlist.name}</Text>
      </Flex>
    </Stack>
  )
}

export default PlaylistCard