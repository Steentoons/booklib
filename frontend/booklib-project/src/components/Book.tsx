import React from 'react'

const Book = () => {
    return (
        <div className="book-layout">
            <div className='book-cover'>
                {/* <img src="" alt="cover image" /> */}
            </div>
            <div className='book-div'>
                <div className='book-info-layout'>
                    <p className='type-form-title'>Above all else</p>
                    <p className='book-author'>Dana Alison Levi</p>
                    <p className='book-category'>Fantasy</p>
                    <p className='book-year'>2016</p>
                </div>
                <div className='book-buttons-layout'>
                    <button className='btn-read-book'>Read Book</button>
                    <button className='btn-delete'>Delete</button>
                    <button className='btn-edit'>Edit</button>
                </div>
            </div>
        </div>
    )
}

export default Book