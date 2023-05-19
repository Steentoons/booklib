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
    refresh: boolean;
    setRefresh: (bool: boolean) => void;
    success: string | undefined;
    setSuccess: (success: string | undefined) => void;
    error: string | undefined;
    setError: (error: string | undefined) => void;
    popup: string | undefined;
    setPopup: (popup: string | undefined) => void
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
    const [refresh, setRefresh] = useState(false)
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    const [popup, setPopup] = useState<string | undefined>(undefined)
    return (
        <MyContext.Provider value={{ user, setUser, books, setBooks, pdfUrl, setPdfUrl, setEpubUrl, epubUrl, refresh, setRefresh, success, setSuccess, error, setError, popup, setPopup }}>
            {props.children}
        </MyContext.Provider>
    )
}

export { MyContext, MyContextProvider };