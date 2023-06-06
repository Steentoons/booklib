import React, { useContext, useEffect, useState } from 'react'
import Book from '../components/Book'
import Search from '../components/library/Search'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MyContext } from '../components/MyContextProvider'
interface Login {
    username: string;
    password: string;
}

const Library = () => {

    const { user, books, setBooks, refresh, setRefresh, setSuccess, setError } = useContext(MyContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (user === null) {
            navigate('/login')
        }
    }, [user])

    useEffect(() => {
        // Fetch the books...
        if (user) {
            axios.get('http://localhost:3000/api/books', { withCredentials: true })
                .then(res => {
                    if (res.status === 200) {

                        setBooks([...res.data.books])
                        setSuccess("The books were fetched successifully")
                    }
                })
                .catch(err => {
                    if (err.response) {
                        setError(err.response.data.error)
                    } else {
                        setError('There was an error while fetching the books')
                    }
                })
        }
    }, [user])

    useEffect(() => {
        if (refresh) {
            axios.get('http://localhost:3000/api/books', { withCredentials: true })
                .then(res => {
                    if (res.status === 200) {

                        setBooks([...res.data.books])
                        setSuccess('The books were fetched successifully')
                        setRefresh(false)
                    }
                })
                .catch(err => {
                    if (err.response) {
                        setError(err.response.data.error)
                    } else {
                        setError('There was an error while fetching the books')
                    }
                })
        }
    }, [refresh])

    const printBooks = books.map((book, idx) => {
        return <Book key={idx} _id={book._id} title={book.title} fileExt={book.fileExt} author={book.author} category={book.category} cover_image={book.cover_image}
            file={book.file}
            user={book.user}
            year={book.year} />
    })

    return (<section className='dashboard-layout'>
        <div className='dashboard'>
            <div className='library-title-layout'>
                <h2 className="type-form-title">Available Books</h2>
            </div>
            <div className="search-layout">
                <Search />
            </div>
            {printBooks}
        </div>
    </section>
    )
}

export default Library