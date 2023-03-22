import React, { useState } from 'react'

const Search = () => {
    const [filterOpen, setFilterOpen] = useState(false)
    return (
        <div className='search-layout'>
            <form action="" className='search-form flex-grow'>
                <input type="text" placeholder='Above all else' className="form-input-layout flex-grow" />
                <div className='search-floating-btn-layout'>
                    <button type='submit' className='btn-read-book search-floating-btn'>Search Book</button>
                </div>
            </form>
            <div className='display-flex'>
                <button className='btn-edit' onClick={() => setFilterOpen(!filterOpen)}>Filter by Category</button>
                {filterOpen && <div className='floating-filter-layout'>
                    <ul className='floating-filter-div'>
                        <li className='type-filter' onClick={() => setFilterOpen(false)}>Fantasy</li>
                        <li className='type-filter' onClick={() => setFilterOpen(false)}>Horror</li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default Search