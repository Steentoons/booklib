import React, { useEffect, useState } from 'react'
import Book from '../components/Book'
import Search from '../components/library/Search'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { User } from '../App'
interface Login {
    username: string;
    password: string;
}

interface LibraryProps {
    user: User | null;
    setUser: (user: User) => void;
}

interface BooksType {
    __v: number;
    _id: string;
    author: string;
    category: string;
    cover_image: string;
    file: string;
    title: string;
    user: string;
    year: string;
}

const Library = ({ user, setUser }: LibraryProps) => {

    const [books, setBooks] = useState<BooksType[] | []>([])

    const navigate = useNavigate()
    useEffect(() => {
        console.log(`The user is ${user}`)
        if(user === null) {
            navigate('/login')
        } else {
            console.log("There was a login issue not captured after this?")
            axios.get('http://localhost:3000/api/books', {withCredentials: true})
                .then(res => {
                    console.log(res.status)
                    if(res.status === 200) {

                        setBooks([...res.data.books])
                        console.log('These are the fetched books')
                        console.log(res.data.books)
                    }
                })
                .catch(err => {
                    console.log('There was an error while fetching the books')
                    if(err.response) {
                        console.log(err.response.status)
                        console.log(err.response.data.error)
                    }
                })
                console.log('Thiss is after the call')
        }
    }, [user])

    const printBooks = books.map((book, idx) => {
        return <Book key={idx} />
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