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

const Library = ({ user, setUser }: LibraryProps) => {
    const navigate = useNavigate()
    useEffect(() => {
        if(user === null) {
            navigate('/login')
        }
    }, [user])

    return (<section className='dashboard-layout'>
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