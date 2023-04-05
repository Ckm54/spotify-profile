import React from 'react'
import { PlaylistTrackType } from '../../../types'

type PlaylistTrackProps = {
  track: PlaylistTrackType
}

const PlaylistTrack = ({ track }: PlaylistTrackProps) => {
  return (
    <div>PlaylistTrack</div>
  )
}

export default PlaylistTrack