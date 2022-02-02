import { useNProgress } from '@tanem/react-nprogress'
import { FC } from 'react'

export const LoadingPage: FC<{ isRouteChanging: boolean }> = ({ isRouteChanging }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating: isRouteChanging
  })

  return (
    <>
      <style jsx>{`
        .container {
          opacity: ${isFinished ? 0 : 1};
          pointerevents: none;
          transition: opacity ${animationDuration}ms linear;
        }

        .bar {
          background: #ff2200;
          height: 8px;
          left: 0;
          margin-left: ${(-1 + progress) * 100}%;
          position: fixed;
          top: 0;
          transition: margin-left ${animationDuration}ms linear;
          width: 100%;
          z-index: 1031;
          border-radius: 0 4px 4px 0;
        }
      `}</style>
      <div className='container'>
        <div className='bar'></div>
      </div>
    </>
  )
}
