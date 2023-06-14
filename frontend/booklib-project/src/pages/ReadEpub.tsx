import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { ReactReader } from 'react-reader'
import { MyContext, User } from '../components/MyContextProvider'
import axios from 'axios'
import Header from '../components/Header'

const ReadEpub = () => {

    const { epubUrl, setSuccess, setError, setUser } = useContext(MyContext)
    const [file, setFile] = useState<string | undefined>()

    useEffect(() => {
        setStorage(epubUrl)
        handleBookFetchFn(setSuccess, setFile, setError, setUser)
    }, [])

    // @ts-ignore
    // const [location, setLocation] = useState(handleLocation());

    // useEffect(() => {
    // }, [file])

    return (
        <>
            {/*<Header/>*/}
            <div style={{ height: '100vh', width: '100vw', paddingTop: '90px' }}>
                {/* @ts-ignore */}
                {file ? <ReactReader url={epubUrl} epubInitOptions={{ openAs: 'epub' }} /> : <p style={{ padding: '50px' }}>Loading</p>}
            </div>
        </>
    )
}

// set local storage...
function setStorage(epubUrl: string | undefined) {
    if (typeof epubUrl === 'string' && epubUrl.length > 0) {
        localStorage.setItem('epubUrl', epubUrl)
    }
}

// Fetching the Book...
function handleBookFetchFn(setSuccess: (success: string | undefined) => void, setFile: React.Dispatch<React.SetStateAction<string | undefined>>, setError: (error: string | undefined) => void, setUser: (user: User | null) => void) {
    console.log("Is it you")
    if (localStorage.getItem('epubUrl')) {
        // @ts-ignore
        axios.get(localStorage.getItem('epubUrl'), { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    const blob = new Blob([res.data], { type: 'application/epub+zip' });
                    const blobUrl = URL.createObjectURL(blob)

                    // Setting the newly generated blob url to the active state...
                    setSuccess("Opening the book")
                    setFile(blobUrl)
                }
            })
            .catch(err => {
                if (err.response) {
                    if(err.response.status === 403) {
                        setUser(null)
                        setError(err.response.data.error)
                    }
                } else {
                    setError("there was an error when fetching the file")
                }
            })
    }
}

// Handle the location...
function handleLocation() {
    if (!localStorage.getItem('location')) {
        return null
    }

    if (typeof localStorage.getItem('location') !== 'string') {
        //@ts-ignore
        const parsedLocation = JSON.parse(localStorage.getItem('location'))
        return parsedLocation
    }

    return null
}

function handleLocationChanged(epubcifi: string, setLocation: (value: any) => void) {
    setLocation(epubcifi);
    localStorage.setItem('location', epubcifi)
};

export default ReadEpub