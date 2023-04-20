import axios from 'axios';
import React, { useEffect } from 'react'

interface BookProps {
    _id: string;
    author: string;
    category: string;
    cover_image: string;
    file: string;
    title: string;
    user: string;
    year: string;
}

const Book = ({
    _id,
    author,
    category,
    cover_image,
    file,
    title,
    user,
    year,}: BookProps) => {

        const readBook = () => {
            axios.get(`http://localhost:3000/api/media/files/${file}`, {withCredentials: true})
                .then(res => {
                    if(res.status === 200) {
                        console.log(res.data)
                    }
                })
                .catch(err => {
                    if(err.response) {
                        console.log(err.response.status)
                        console.log("there was an error when fetching the file")
                    }
                })
        }

    return (
        <div className="book-layout">
            <div className='book-cover'>
                <img src={`http://localhost:3000/api/media/images/${cover_image}`} alt={`Cover image for ${title} by ${author} ${cover_image}`} />
            </div>
            <div className='book-div'>
                <div className='book-info-layout'>
                    <p className='type-form-title'>{title}</p>
                    <p className='book-author'>{author}</p>
                    <p className='book-category'>{category}</p>
                    <p className='book-year'>{year}</p>
                </div>
                <div className='book-buttons-layout'>
                    <button onClick={() => readBook()} className='btn-read-book'>Read Book</button>
                    <button className='btn-delete'>Delete</button>
                    <button className='btn-edit'>Edit</button>
                </div>
            </div>
        </div>
    )
}

export default Book