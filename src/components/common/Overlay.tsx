import { MouseEvent, ReactNode, useRef } from 'react'

interface IProps {
  onClick?: (e: MouseEvent<HTMLElement>, element: HTMLElement) => void
  isWithoutNavBar?: boolean
  children: ReactNode
}

export const Overlay = ({ onClick = () => {}, isWithoutNavBar = false, children }: IProps) => {
  const overlayRef = useRef()

  return (
    <div
      className={`backdrop-filter backdrop-blur-lg fixed ${isWithoutNavBar ? 'top-0' : 'top-16'} lg:top-0 bottom-0 left-0 right-0 flex items-center justify-center animate-fade-in z-50`}
      ref={overlayRef}
      onClick={(e) => onClick(e, overlayRef.current)}
    >
      {children}
    </div>
  )
}
