import React, { useContext, useEffect, useState } from 'react'
import Book from '../components/Book'
import Search from '../components/library/Search'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BooksType, MyContext, User } from '../components/MyContextProvider'
import Header from '../components/Header'
interface Login {
    username: string;
    password: string;
}

const Library = () => {

    const { user, books, setBooks, refresh, setRefresh, setSuccess, setError, setUser } = useContext(MyContext)

    // const navigate = useNavigate()

    // User validation...
    useEffect(() => {
        // validationToFetchBooks(user, navigate, setBooks, setSuccess, setError)
        if (user) {
            fetchBooks(setBooks, setSuccess, setError, setUser)
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

    return (
        <>
            {/*<Header/>*/}
            <section className='dashboard-layout'>
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
        </>
    )
}

// Navigate to login, or fetch books...
// function validationToFetchBooks(user: User | null, navigate: NavigateFunction, setBooks: (books: BooksType[]) => void, setSuccess: (success: string | undefined) => void, setError: (error: string | undefined) => void) {
//     if (user === null) {
//         navigate('/login')
//     } else {
//         if (user) {
//             fetchBooks(setBooks, setSuccess, setError)
//         }
//     }
// }

// Fetching the books...
function fetchBooks(setBooks: (books: BooksType[]) => void, setSuccess: (success: string | undefined) => void, setError: (error: string | undefined) => void, setUser: (user: User | null) => void) {
    axios.get('http://localhost:3000/api/books', { withCredentials: true })
        .then(res => {
            if (res.status === 200) {
                setBooks([...res.data.books])
                setSuccess("The books were fetched successifully")
            }
        })
        .catch(err => {
            if (err.response) {
                if(err.response.status === 403) {
                    setUser(null)
                    setError(err.response.data.error)
                }
            } else {
                setError('There was an error while fetching the books')
            }
        })
}

export default Library