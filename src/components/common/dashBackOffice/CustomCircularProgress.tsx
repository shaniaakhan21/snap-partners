import { CircularProgress } from '@mui/material'
// eslint-disable-next-line no-use-before-define
import React from 'react'

interface PvInterface {
  pvPercentage: number;
  pvNumber: string;
}

interface RtInterface {
  rtPercentage: number
  rtNumber: string
}

interface PVProgressProps {
  color?: string;
  transformStyle?: React.CSSProperties['transform'];
  data: PvInterface[] | RtInterface[];
}

export function PVProgress ({ color = '#82B254', transformStyle, data }: PVProgressProps) {
  return (
    <div className="flex items-center">
      <div className="m-2 h-20">
        {data.map((item) => (
          <div key={item.pvNumber | item.rtNumber}>
            <CircularProgress
              size={85}
              thickness={4}
              value={item.pvPercentage | item.rtPercentage}
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
              {item.pvPercentage | item.rtPercentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
