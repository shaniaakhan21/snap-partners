import { CircularProgress } from '@mui/material'
// eslint-disable-next-line no-use-before-define
import React from 'react'

interface PVProgressProps {
  color?: string;
  transformStyle?: React.CSSProperties['transform'];
  percentage: number
}

export function PVProgress ({ color = '#82B254', transformStyle, percentage }: PVProgressProps) {
  return (
    <div className="flex items-center">
      <div className="m-2 h-20">
        <div>
          <CircularProgress
            size={85}
            thickness={4}
            value={percentage}
            style={{ color, transform: transformStyle || 'rotate(120deg)' }}
            variant="determinate"
          />
          <div
            style={{
              position: 'relative',
              bottom: '48px',
              left: '70%',
              transform: 'translate(-50%, -50%)',
              fontSize: '20px',
              fontWeight: 'bold'
            }}
          >
            {percentage}%
          </div>
        </div>
      </div>
    </div>
  )
}
