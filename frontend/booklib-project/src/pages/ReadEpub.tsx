import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { ReactReader, IReactReaderProps } from 'react-reader'
import { MyContext } from '../components/MyContextProvider'
import axios from 'axios'

const ReadEpub = () => {

    const { epubUrl } = useContext(MyContext)

    const [file, setFile] = useState<string | undefined>()

    useEffect(() => {
        if(epubUrl.length > 0) {
            localStorage.setItem('epubUrl', epubUrl)
        }
        if(localStorage.getItem('epubUrl')) {
            console.log("Kapiiiiish")
            // @ts-ignore
            axios.get(localStorage.getItem('epubUrl'), { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    // Converting the base64 string to a blob using atob...
                    // const binaryData = atob(res.data);
                    // const arrayBuffer = new ArrayBuffer(binaryData.length);
                    // const uint8Array = new Uint8Array(arrayBuffer);
                    // for (let i = 0; i < binaryData.length; i++) {
                    //     uint8Array[i] = binaryData.charCodeAt(i);
                    // }
                    // const blob = new Blob([arrayBuffer], { type: 'application/epub+zip' });
                    // const blobUrl = URL.createObjectURL(blob);

                    console.log(res.data)

                    const blob = new Blob([res.data], { type: 'application/epub+zip' });
                    // console.log(res.data)
                    const blobUrl = URL.createObjectURL(blob)

                    // console.log(blobUrl)

                    // Setting the newly generated blob url to the active state...
                    setFile(blobUrl)
                }
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response.data.error)
                    console.log("there was an error when fetching the file")
                }
            })
        }
    }, [])

    const handleLocation = () => {
        if(!localStorage.getItem('location')) {
            return null
        }

        if(typeof localStorage.getItem('location') !== 'string') {
            //@ts-ignore
            const parsedLocation = JSON.parse(localStorage.getItem('location'))
            return parsedLocation
        }

        return null
    }

    // @ts-ignore
    const [location, setLocation] = useState(handleLocation());

    useEffect(() => {
        console.log(file)
    }, [file])

    const handleLocationChanged = (epubcifi: string) => {
        setLocation(epubcifi);
        localStorage.setItem('location', epubcifi)
    };

    const epubUrl2 = '/src/assets/images/174f04ad58ea419ff364792dbe5a992e_unknown.epub'
    return (
        <div style={{ height: '100vh', width: '100vw', paddingTop: '90px' }}>
            {/* @ts-ignore */}
            {file ? <ReactReader url={epubUrl} epubInitOptions={{openAs: 'epub'}} locationChanged={handleLocationChanged} /> : <p style={{ padding: '50px' }}>Loading</p>}
            {/* @ts-ignore */}
            {/* {epubUrl2 ? <ReactReader url={epubUrl2} epubInitOptions={{openAs: 'epub'}} location={location} locationChanged={handleLocationChanged} /> : <p style={{ padding: '50px' }}>Loading</p>} */}
        </div>
    )
}

export default ReadEpub