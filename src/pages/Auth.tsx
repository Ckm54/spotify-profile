import { Button, Stack, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {}

const Auth = (props: Props) => {
  return (
    <Stack justifyContent={'center'} alignItems='center' minHeight={'100vh'} minWidth='100vw'>
      <Text>Login into spotify profile</Text>
      <Button>Login</Button>
    </Stack>
  )
}

export default Auth