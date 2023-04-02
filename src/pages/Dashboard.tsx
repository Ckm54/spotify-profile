import React from 'react'
import { useRecoilValue } from 'recoil'
import { tokenState } from '../atom/TokenAtom'

type Props = {}

const Dashboard = (props: Props) => {

  const authToken = useRecoilValue(tokenState);

  console.log('auth token', authToken)
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard