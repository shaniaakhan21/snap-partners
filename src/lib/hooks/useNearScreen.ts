import { useEffect, useState } from 'react'
import { createObserver } from 'lib/utils/createObserver'

export const useNearScreen = (element: HTMLElement) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isNear, setIsNear] = useState(false)

  useEffect(() => {
    if (!element && !isMounted) return

    createObserver(element, (entries) => {
      const element = entries[0]

      element.isIntersecting && setIsNear(true)
    })
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isNear
}
