import React from 'react'
import { createContext } from 'react';
import { useState } from 'react';

export interface User {
    name: string;
    email: string;
}

export interface BooksType {
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

interface MyContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    books: BooksType[] | [];
    setBooks: (books: BooksType[]) => void;
    pdfUrl: string;
    setPdfUrl: (url: string) => void;
    setEpubUrl: (url: string) => void;
    epubUrl: string;
}

const MyContext = createContext<MyContextType>({} as MyContextType)

const MyContextProvider = (props: { children: React.ReactNode }) => {
    const handleLocalStorage = () => {
        const userValue = localStorage.getItem("user")
        if (userValue === null || userValue.length === 0) {
            return null
        } else {
            console.log(userValue)
            if (userValue === undefined) {
                return null
            }

            const parsedUser = JSON.parse(userValue)
            return parsedUser
        }
    }
    const [pdfUrl, setPdfUrl] = useState('');
    const [epubUrl, setEpubUrl] = useState('');
    const [user, setUser] = useState<User | null>(handleLocalStorage())
    const [books, setBooks] = useState<BooksType[] | []>([])
    return (
        <MyContext.Provider value={{ user, setUser, books, setBooks, pdfUrl, setPdfUrl, setEpubUrl, epubUrl }}>
            {props.children}
        </MyContext.Provider>
    )
}

export { MyContext, MyContextProvider };