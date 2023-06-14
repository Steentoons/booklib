import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import ReadPdf from '../pages/ReadPdf';
import { MyContext } from './MyContextProvider';

interface BookProps {
    _id: string;
    author: string;
    category: string;
    cover_image: string;
    file: string;
    title: string;
    user: string;
    year: string;
    fileExt: string;
}

const Book = ({
    _id,
    author,
    category,
    cover_image,
    file,
    title,
    fileExt,
    user,
    year, }: BookProps) => {
    const { setPdfUrl, setEpubUrl, setRefresh, setError, setSuccess, setCurrentBookId, setUser } = useContext(MyContext)

    const readBook = () => {
        if(fileExt === '.pdf') {
            setPdfUrl(`http://localhost:3000/api/media/files/${file}`)
        } else if(fileExt === '.epub' || fileExt === '.epub+zip') {
            setEpubUrl(`http://localhost:3000/api/media/files/${file}`)
        }
    }

    const deleteBook = () => {
        // Delete book here...
        axios.delete(`http://localhost:3000/api/books/${_id}`, {withCredentials: true})
            .then(res => {
                if(res.status === 200) {
                    setSuccess(res.data.message)
                    setRefresh(true)
                }
            })
            .catch(err => {
                if (err.response) {
                    if(err.response.status === 403) {
                        setUser(null)
                        setError(err.response.data.error)
                    }
                } else {
                    setError('There was a problem when deleting a book')
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
                    <button
                        onClick={() => readBook()}
                        className='btn-read-book'>Read Book</button>
                    <button className='btn-delete' onClick={() => deleteBook()}>Delete</button>
                    <Link to='/edit-book' onClick={() => setCurrentBookId(_id)}><button className='btn-edit'>Edit</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Book