import { Button, Stack, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {}

const Auth = (props: Props) => {
  return (
    <Stack justifyContent={'center'} alignItems='center' minHeight={'100vh'} minWidth='100vw'>
      <Text fontSize={'24px'} my={4}>My spotify profile</Text>
      <Button variant={'solid'} px={'32px'} py={'16px'}>Log into spotify</Button>
    </Stack>
  )
}

export default Auth