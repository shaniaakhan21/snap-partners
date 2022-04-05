export const RewardPointsCard = () => {
  return (
    <div className='w-full bg-transparent sm:bg-gray-300 rounded-lg max-w-4xl mx-auto mt-20 p-5'>
      <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-x-20'>
        <figure>
          <img src='/images/logo.svg' className='w-60' />
        </figure>

        <section>
          <div className='text-right mt-10 sm:mt-0'>
            <h6 className='text-2xl font-bold text-gray-800'>Reward POINTS!</h6>

            <div className='text-lg mt-4 font-semibold text-gray-800'>
              <p>Every $1.00 Earned = 1 Point</p>
              <p>Customer = 1 Point</p>
              <p>Driver = 1 Point</p>
              <p>Merchant = 1 Point</p>
            </div>
          </div>
          <br />

          <p>
            All points for Customers are realeased after <br /> the Customer places their first Order.
          </p>
          <br />

          <p>
            Points for Drivers release after the Driver <br /> completes their first delivery
          </p>
          <br />

          <p>
            Points for Merchants are release after the <br /> Merchant Fulfills their first Order
          </p>
          <br />
        </section>
      </div>
    </div>
  )
}
