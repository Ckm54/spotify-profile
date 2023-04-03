import { Stack } from '@chakra-ui/layout'
import React from 'react'
import { useQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'
import { UserProfile } from '../../types'
import { getUserProfile } from '../api/apiCalls'
import { userProfileState } from '../atom/UserDataAtom'
import { Dashboard, NavBar } from '../components'
import Layout from '../components/Layout/Layout'

type Props = {}

const Home = (props: Props) => {

  const setUserProfileState = useSetRecoilState(userProfileState);

  const {} = useQuery('userProfile', () => getUserProfile(), {
    onSuccess: (data: UserProfile) => {
      setUserProfileState(data);
    }
  })

  return (
    <Layout children={<Dashboard />} />
  )
}

export default Home