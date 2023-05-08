import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { ReactReader, IReactReaderProps } from 'react-reader'
import { MyContext } from '../components/MyContextProvider'
import axios from 'axios'

const ReadEpub = () => {

    const { epubUrl } = useContext(MyContext)

    const [file, setFile] = useState<string | undefined>()

    useEffect(() => {
        axios.get(epubUrl, { withCredentials: true })
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

                    const blob = new Blob([res.data], { type: 'application/epub+zip' });
                    console.log(res.data)
                    const blobUrl = URL.createObjectURL(blob)

                    console.log(blobUrl)

                    // Setting the newly generated blob url to the active state...
                    setFile(blobUrl)
                }
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response.status)
                    console.log("there was an error when fetching the file")
                }
            })
    }, [])

    const [location, setLocation] = useState(null);

    useEffect(() => {
        console.log(file)
    }, [file])

    //@ts-ignore
    const handleLocationChanged = (epubcifi) => {
        setLocation(epubcifi);
    };

    const epubUrl2 = '/src/assets/images/174f04ad58ea419ff364792dbe5a992e_unknown.epub'
    return (
        <div style={{ height: '100vh', width: '100vw', paddingTop: '90px' }}>
            {/* @ts-ignore */}
            {file ? <ReactReader url={file} epubOptions={{ spread: 'none', flow: 'scrolled' }} locationChanged={handleLocationChanged} /> : <p style={{ padding: '50px' }}>Loading</p>}
            {/* @ts-ignore */}
            {/* {epubUrl2 ? <ReactReader url={epubUrl2} epubOptions={{ spread: 'none', flow: 'scrolled' }} locationChanged={handleLocationChanged} /> : <p style={{ padding: '50px' }}>Loading</p>} */}
        </div>
    )
}

export default ReadEpub