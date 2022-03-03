import { MutableRefObject, useEffect, useState } from 'react'

export const useClickOutsideElement = (ref: MutableRefObject<any>) => {
  const [clickOutside, setClickOutside] = useState(false)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      setClickOutside(ref.current && !ref.current.contains(e.target))
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref])

  return clickOutside
}
