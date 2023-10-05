import { Card as MUICard, CardContent, Typography } from '@mui/material'

interface CardProps {
  heading: string;
  content: string;
}

const ProgramCard = ({ heading, content }: CardProps) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 3xl:1/3 p-4">
      <MUICard className="h-full lg:px-6 lg:py-3 shadow-lg bg-red-50 rounded-lg shadow-red-100">
        <CardContent >
          <Typography variant="h6" className='text-base lg:text-4xl text-navy font-bold 3xl:text-6xl'>{heading}</Typography>
          <br></br>
          <Typography variant="body2" className='text-navy text-base lg:text-lg font-light 3xl:text-2xl'>
            {content}
          </Typography>
        </CardContent>
      </MUICard>
    </div>
  )
}

export default ProgramCard
