import React from 'react'
import Book from '../components/Book'
import Search from '../components/library/Search'

const Library = () => {
    return (
        <section className='dashboard-layout'>
            <div className='dashboard'>
            <div className='library-title-layout'>
            <h2 className="type-form-title">Available Books</h2>
            </div>
                <div className="search-layout">
                    <Search />
                </div>
                <Book />
                <Book />
                <Book />
            </div>
        </section>
    )
}

export default Library