import { useEffect } from 'react'

import { createObserver } from 'lib/utils/createObserver'

export const useNearScreen = (elementId: string, cbHandleIntersection: () => void) => {
  useEffect(() => {
    const element = document.getElementById(elementId)

    if (!element) return

    createObserver(element, (entries, observer) => {
      const { isIntersecting } = entries[0]

      isIntersecting && cbHandleIntersection()
    })
  })
}
