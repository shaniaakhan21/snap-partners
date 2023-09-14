// StarAchieverTableClient.js
import dynamic from 'next/dynamic'

const StarAchieverTableClient = dynamic(() => import('./StarAchieverTable'), {
  ssr: false
})

export default StarAchieverTableClient
