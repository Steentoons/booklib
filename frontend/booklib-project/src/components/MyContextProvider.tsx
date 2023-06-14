import React, { useEffect } from 'react'
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
    pdfUrl: string | undefined;
    setPdfUrl: (url: string | undefined) => void;
    setEpubUrl: (url: string | undefined) => void;
    epubUrl: string | undefined;
    refresh: boolean;
    setRefresh: (bool: boolean) => void;
    success: string | undefined;
    setSuccess: (success: string | undefined) => void;
    error: string | undefined;
    setError: (error: string | undefined) => void;
    popup: string | undefined;
    setPopup: (popup: string | undefined) => void;
    currentBookId: string | undefined;
    setCurrentBookId: (id: string | undefined) => void;
}

const MyContext = createContext<MyContextType>({} as MyContextType)

const MyContextProvider = (props: { children: React.ReactNode }) => {
    
    const [pdfUrl, setPdfUrl] = useState<string | undefined>('');
    const [epubUrl, setEpubUrl] = useState<string | undefined>('');
    const [user, setUser] = useState<User | null>(handlesessionStorage())
    const [books, setBooks] = useState<BooksType[] | []>([])
    const [refresh, setRefresh] = useState(false)
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    const [popup, setPopup] = useState<string | undefined>(undefined)
    const [currentBookId, setCurrentBookId] = useState<string | undefined>(undefined)

    useEffect(() => {
        if(user === null) {
            sessionStorage.setItem('user', '')
        } else {
            console.log("logged out??")
            sessionStorage.setItem('user', JSON.stringify(user))
        }
    }, [user])
    return (
        <MyContext.Provider value={{ user, setUser, books, setBooks, pdfUrl, setPdfUrl, setEpubUrl, epubUrl, refresh, setRefresh, success, setSuccess, error, setError, popup, setPopup, currentBookId, setCurrentBookId }}>
            {props.children}
        </MyContext.Provider>
    )
}

// Handling local storage...
function handlesessionStorage () {
    const userValue = sessionStorage.getItem("user")
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

export { MyContext, MyContextProvider };