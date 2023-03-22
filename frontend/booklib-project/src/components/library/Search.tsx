import React from 'react'

const Search = () => {
    return (
        <div className='search-layout'>
            <form action="" className='search-form flex-grow'>
                <input type="text" placeholder='Above all else' className="form-input-layout flex-grow" />
                <div className='search-floating-btn-layout'>
                    <button type='submit' className='btn-read-book search-floating-btn'>Search Book</button>
                </div>
            </form>
                <button className='btn-edit'>Filter by Category</button>
        </div>
    )
}

export default Search