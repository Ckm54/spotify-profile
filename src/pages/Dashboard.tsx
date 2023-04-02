import { Button } from '@chakra-ui/button'
import { Flex, Stack, Text } from '@chakra-ui/layout'
import React from 'react'
import { UserProfile } from '../../types'
import { getUserProfile } from '../api/apiCalls'
import { NavBar } from '../components'

type Props = {}

const Dashboard = (props: Props) => {

  const [userProfile, setUserProfile] = React.useState<UserProfile>()

  React.useEffect(() => {
    const getProfile = async() => {
      return await getUserProfile();
    }
    const userProfile: UserProfile = getProfile();

    setUserProfile(userProfile)
  }, []);

  return (
    <Stack>
      <NavBar />
      <Text>Dashboard {userProfile?.display_name}</Text>
    </Stack>
  )
}

export default Dashboard