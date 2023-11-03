/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
interface file {
    fileId:number,
}
function ImageComponent (props:file) {
  const { fileId } = props
  const [imgUrl, setImgUrl] = useState('')
  const[thumbnailData, setThumbnailData] = useState(null)
  const fetchThumbnailUrl = async (fileId) => {
    console.log('in fetch function')
    await axios.get(`/api/document/thumbnail/${fileId}`)
      .then(async (response) => {
        if (response.data.status) {
          // const res = await (getFileSrc(response.data.result[0], true))
          console.log('res is thumbnail', response.data.result[0])
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


  const getFileSrc = (file, isThumbnail) => {
    const buffer = Buffer.from(isThumbnail ? file?.thumbnailData : file?.fileData)
    const data = new Blob([buffer], { type: `${isThumbnail ? file?.thumbnailType : file?.fileType}` })
    return (URL.createObjectURL(data))
  }
  return (
    <div><img src={thumbnailData && thumbnailData.thumbnailUrl ? thumbnailData.thumbnailUrl : `https://snap-delivered.nyc3.digitaloceanspaces.com/documentsThumbnail/${encodeURIComponent(thumbnailData?.thumbnailName)}`} style={{
        width: '100%',
        height: '150px',
        objectFit: 'contain'
      }} /></div>
  )
}

export default ImageComponent