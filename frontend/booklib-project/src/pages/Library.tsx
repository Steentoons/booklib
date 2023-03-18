import React from 'react'
import Book from '../components/Book'

const Library = () => {
    return (
        <section className='dashboard-layout'>
            <div className='dashboard'>
                <div className="search-layout"></div>
                <Book />
                <Book />
                <Book />
            </div>
        </section>
    )
}

export default Library