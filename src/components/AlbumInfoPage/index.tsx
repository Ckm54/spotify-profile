import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { getAlbumInfo } from '../../api/apiCalls';

type Props = {}

const AlbumInfoPage = (props: Props) => {

  const { id } = useParams();

  const {} = useQuery(['getTrackDetails', id], () => getAlbumInfo(id!), {
    onSuccess: (data) => {
      console.log(data);
    },
    enabled: !!id,
  })

  return (
    <div>AlbumInfoPage</div>
  )
}

export default AlbumInfoPage