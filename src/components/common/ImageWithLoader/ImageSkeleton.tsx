import { useState } from 'react'

interface IImageWithLoaderProps {
  src: string
  height: number | string
  width: number | string
}

export const ImageSkeleton = ({ src, height, width }: IImageWithLoaderProps) => {
  const [loading, setLoading] = useState(true)

  return (
    <img
      src={src ?? '/static/no-img.webp' }
      height={height}
      width={width}
      className={`rounded-t-2xl w-full bg-gray-300 ${loading && 'animate-pulse'}`}
      onLoad={() => setLoading(false)}
      loading='lazy'
    />
  )
}
