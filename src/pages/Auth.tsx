import { Button, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil';
import authenticateUser from '../api/auth';
import { tokenState } from '../atom/TokenAtom';

type Props = {}

const clientID = import.meta.env.VITE_CLIENT_ID;

const Auth = (props: Props) => {

  const setAuthToken = useSetRecoilState(tokenState);


  const handleLogin = async () => {
    const profile = authenticateUser(clientID, setAuthToken);

    console.log("The profile is", profile);
  }

  return (
    <Stack justifyContent={'center'} alignItems='center' minHeight={'100vh'} minWidth='100vw'>
      <Text fontSize={'24px'} my={4}>My spotify profile</Text>
      <Button variant={'solid'} px={'32px'} py={'16px'} onClick={handleLogin}>Log into spotify</Button>
    </Stack>
  )
}

export default Auth