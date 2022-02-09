import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export const Graphics = ({ data }: { data: any }) => {
  return (
    <div className=' col-span-1 row-span-1 sm:col-start-3 sm:col-span-3 md:col-start-2 flex justify-center items-center'>
      <ResponsiveContainer height={200} className='w-full'>
        <BarChart
          width={60}
          height={200}
          data={data}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='pv' fill='#18C8FF' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
