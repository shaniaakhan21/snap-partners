import { createRef, useEffect } from 'react'

export const useCopyToClipboard = (textToCopy: string, onSuccess: () => void, onError: () => void) => {
  const { current: clickRef } = createRef<HTMLElement>()

  const copyHandler = () => {
    if (!navigator.clipboard) {
      return
    }

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        onSuccess && onSuccess()
      })
      .catch(() => {
        onError && onError()
      })
  }

  useEffect(() => {
    if (clickRef) {
      clickRef.addEventListener('click', copyHandler)
    }

    return () => {
      clickRef?.removeEventListener('click', copyHandler)
    }
  }, [clickRef])

  return clickRef
}
