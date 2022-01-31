import React from 'react'

import logoSrc from '../../../svg/logo.svg'

export const ComingSoonPage = () => (
  <div className="flex flex-col h-screen bg-center bg-cover bg-no-repeat bg-gray-100">
		<div className="grid place-items-center w-4/5 mx-auto p-10 my-20 sm:my-auto bg-white-600 border-4 border-primary-500 bg-opacity-70 rounded-xl shadow-2xl space-y-5 text-center">
      <img src={logoSrc} width={150} height={150} />
       
			<h1 className="text-4xl font-bold uppercase text-primary-500 transition duration-500">Coming Soon</h1>
        <h2 className="text-xl text-gray-700 transition duration-500">We are almost there to introduce our new application to the world, in the meantime, you can follow us on social networks to get the latest updates.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

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

        </div>
		</div>
	</div>
)