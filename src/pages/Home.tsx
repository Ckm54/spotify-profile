import { Stack } from '@chakra-ui/layout'
import React from 'react'
import { useQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'
import { ArtistsFollowed, TopArtists, UserProfile } from '../../types'
import { getFollowing, getTopArtists, getUserProfile } from '../api/apiCalls'
import { userProfileState } from '../atom/UserDataAtom'
import { userFollowedArtistsState } from '../atom/UserFollowedArtists'
import { Dashboard, NavBar } from '../components'
import Layout from '../components/Layout/Layout'

type Props = {}

const Home = (props: Props) => {

  const setUserProfileState = useSetRecoilState(userProfileState);
  const setArtistsFollowed = useSetRecoilState(userFollowedArtistsState);

  const {} = useQuery('userProfile', () => getUserProfile(), {
    onSuccess: async (data: UserProfile) => {
      setUserProfileState(data);
    }
  });


  const {} = useQuery('getFollowing', () => getFollowing(), {
    onSuccess: (data: ArtistsFollowed) => {
      setArtistsFollowed(data)
    }
  })

  return (
    <Layout children={<Dashboard />} />
  )
}

export default Home