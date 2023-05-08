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
    const { setPdfUrl, setEpubUrl } = useContext(MyContext)

    const readBook = () => {
        if(fileExt === '.pdf') {
            console.log(`http://localhost:3000/api/media/files/${file}`)
            setPdfUrl(`http://localhost:3000/api/media/files/${file}`)
        } else if(fileExt === '.epub' || fileExt === '.epub+zip') {
            console.log(`http://localhost:3000/api/media/files/${file}`)
            setEpubUrl(`http://localhost:3000/api/media/files/${file}`)
        }
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
                    <button className='btn-delete'>Delete</button>
                    <button className='btn-edit'>Edit</button>
                </div>
            </div>
        </div>
    )
}

export default Book