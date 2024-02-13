/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
interface file {
    fileId:number,
}
function ImageComponent (props:file) {
  const { fileId } = props
  const [imgUrl, setImgUrl] = useState('')
  const [thumbnailData, setThumbnailData] = useState(null)
  const fetchThumbnailUrl = async (fileId) => {
    console.log('in fetch function')
    await axios.get(`/api/document/thumbnail/${fileId}`)
      .then(async (response) => {
        if (response.data.status) {
          setThumbnailData(response.data.result[0])
        } else {
          return ''
        }
      })
      .catch((e) => {
        return ''
      })
  }
  useEffect(() => {
    fetchThumbnailUrl(fileId)
  }, [fileId])

  return (
    <div><img src={thumbnailData && thumbnailData.thumbnailUrl ? thumbnailData.thumbnailUrl : `https://snap-delivered.nyc3.digitaloceanspaces.com/documentsThumbnail/${encodeURIComponent(thumbnailData?.thumbnailName)}`} style={{
      width: '100%',
      height: '294px',
      objectFit: 'contain'
    }} className='rounded-t-2xl' /></div>
  )
}

export default ImageComponent
