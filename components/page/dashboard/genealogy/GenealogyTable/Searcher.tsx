import { CancelIcon } from 'components/common/icons'
import { useForm } from 'react-hook-form'

export const Searcher = ({ searchById, searchByName, searchByPhone, resetSearcher, searchedUser }) => {
  const { register, handleSubmit, reset } = useForm()

  const handleCancelFilter = () => {
    resetSearcher()
    reset()
  }

  const onSubmit = (data) => {
    if (data.filter === 'id') { searchById(data.search) }
    if (data.filter === 'name') { searchByName(data.search) }
    if (data.filter === 'phone') { searchByPhone(data.search) }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-wrap justify-start items-end mt-4 gap-y-3 gap-x-4'
    >
      <input
        id='search'
        name='search'
        type='text'
        {...register('search')}
        placeholder='Search'
        className='px-3 py-1 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
      />

      <div className='flex flex-col'>
        <label htmlFor='filter' className='font-bold'>Filter</label>

        <select
          id='filter'
          name='filter'
          {...register('filter')}
          className='px-2 py-2.5 border border-gray-300 rounded'
          placeholder='Filter'
        >
          <option value='id'>ID</option>
          <option value='name'>Name</option>
          <option value='phone'>Phone</option>
        </select>
      </div>

      <div className='flex justify-start items-center gap-x-4'>
        <button
          type='submit'
          className='bg-primary-500 px-6 py-2.5 rounded-md text-white font-semibold'
        >
          Search
        </button>

        {
          searchedUser && <CancelIcon
            classes='cursor-pointer'
            onClick={handleCancelFilter}
          />
        }
      </div>
    </form>
  )
}
