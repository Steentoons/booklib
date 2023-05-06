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

    const { user, books, setBooks } = useContext(MyContext)

    const navigate = useNavigate()

    useEffect(() => {
        console.log(`The user is ${user}`)
        if (user === null) {
            navigate('/login')
        }
    }, [user])

    useEffect(() => {
        // Fetch the books...
        axios.get('http://localhost:3000/api/books', { withCredentials: true })
            .then(res => {
                if (res.status === 200) {

                    setBooks([...res.data.books])
                    console.log('These are the fetched books')
                    console.log(res.data.books)
                }
            })
            .catch(err => {
                console.log('There was an error while fetching the books')
                if (err.response) {
                    console.log(err.response.status)
                    console.log(err.response.data.error)
                }
            })
    }, [])

    const printBooks = books.map((book, idx) => {
        return <Book key={idx} _id={book._id} title={book.title} author={book.author} category={book.category} cover_image={book.cover_image}
            file={book.file}
            user={book.user}
            year={book.year} />
    })

    return (<section className='dashboard-layout'>
        <div className='dashboard'>
            <div className='library-title-layout'>
                <h2 className="type-form-title">Available Broks</h2>
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