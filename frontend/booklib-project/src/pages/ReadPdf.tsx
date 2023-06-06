import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf'
import { MyContext } from '../components/MyContextProvider'
import { Worker } from '@react-pdf-viewer/core'
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import file from '../assets/images/Chess For Dummies ( PDFDrive ).pdf'

// @ts-ignore
const ReadPdf = () => {
    const { pdfUrl, setError, setSuccess } = useContext(MyContext)

    const [file, setFile] = useState<string | undefined>()

    useEffect(() => {
        axios.get(pdfUrl, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    // Converting the base64 string to a blob using atob...
                    const binaryData = atob(res.data);
                    const arrayBuffer = new ArrayBuffer(binaryData.length);
                    const uint8Array = new Uint8Array(arrayBuffer);
                    for (let i = 0; i < binaryData.length; i++) {
                        uint8Array[i] = binaryData.charCodeAt(i);
                    }
                    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
                    const newPdfUrl = URL.createObjectURL(blob)

                    setSuccess("Opening the book")
                    // Setting the newly generated blob url to the active state...
                    setFile(newPdfUrl)
                }
            })
            .catch(err => {
                if (err.response.data.error) {
                    setError(err.response.data.error)
                } else {
                    setError("there was an error when fetching the file")
                }
            })
    }, [])

    return (
        <div style={{
            border: '1px solid rgba(0, 0, 0, 0.3)',
            height: '750px',
            paddingTop: '80px',
            paddingLeft: '20px',
            paddingRight: '20px'
        }}>
            <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                {
                    file !== undefined ? <Viewer fileUrl={file} /> : <p style={{ padding: '50px' }}>Loading</p>
                }
            </Worker>
        </div>
    )
}

export default ReadPdf