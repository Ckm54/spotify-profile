import { Button } from '@chakra-ui/button'
import { Flex, Text } from '@chakra-ui/layout'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { logout } from '../api/spotify'
import { tokenState } from '../atom/TokenAtom'

type Props = {}

const Dashboard = (props: Props) => {

  return (
    <Flex>
      <Text>Dashboard</Text>
      <Button onClick={logout}>Logout</Button>
    </Flex>
  )
}

export default Dashboard