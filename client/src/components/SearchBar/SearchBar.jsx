import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({searchUser}) => {
  const [query, setQuery] = useState("");

  return (
    <div className='w-[90%] mx-auto flex my-1 flex-nowrap items-center rounded-full bg-[#fafafa] border border-gray-300 overflow-hidden'>
      <input type="text" className='p-2 flex-grow rounded-full px-5 text-gray-600' placeholder='Search Peoples...' value={query} onChange={e => setQuery(e.target.value)} />
      <div className='border-l border-gray-300 px-3' onClick={e => searchUser(query)}>
        <SearchIcon />
      </div>
    </div>
  )
}

export default SearchBar;