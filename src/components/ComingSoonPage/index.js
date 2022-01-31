import React from 'react'

import logoSrc from '../../../svg/logo.svg'

export const ComingSoonPage = () => (
  <div className='h-full w-full flex items-center justify-center'>
	  <div className="max-w-3xl w-full p-10 bg-white border-4 border-primary-500 bg-opacity-70 rounded-xl shadow-2xl space-y-5 text-center">
     <img src={logoSrc} width={150} height={150} className='mx-auto' />

	  	<h1 className="text-4xl font-bold uppercase text-primary-500 transition duration-500">Coming Soon</h1>
       <h2 className="text-xl text-gray-700 transition duration-500">We are almost there to introduce our new application to the world, in the meantime, you can follow us on social networks to get the latest updates.</h2>
       {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

         <a 
          href="#" 
          className="md:w-32 tracking-wide font-bold rounded border-2 border-primary-500 hover:text-white hover:bg-primary-500 shadow-md py-2 px-6 inline-flex items-center transition duration-500"
         >
           <span className="mx-auto">Facebook</span>
         </a>


         <a 
          href="#"
          className="md:w-32 tracking-wide font-bold rounded border-2 border-primary-500 hover:text-white hover:bg-primary-500 shadow-md py-2 px-6 inline-flex items-center transition duration-500"
         >
           <span className="mx-auto">Twitter</span>
         </a>


         <a 
          href="#" 
          className="md:w-32 tracking-wide font-bold rounded border-2 border-primary-500 hover:text-white hover:bg-primary-500 shadow-md py-2 px-6 inline-flex items-center transition duration-500"
         >
           <span className="mx-auto">Pintrest</span>
         </a>


         <a 
          href="#" 
          className="md:w-32 tracking-wide font-bold rounded border-2 border-primary-500 hover:text-white hover:bg-primary-500 shadow-md py-2 px-6 inline-flex items-center transition duration-500"
         >
           <span className="mx-auto">Reddit</span>
         </a>

       </div> */}
	  </div>
  </div>
)