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
    const { pdfUrl } = useContext(MyContext)

    const [file, setFile] = useState<Blob | undefined>()

    useEffect(() => {
        axios.get(pdfUrl, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    const pdfBlob = new Blob([res.data], {type: 'application/pdf'})
                    setFile(pdfBlob)
                }
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response.status)
                    console.log("there was an error when fetching the file")
                }
            })
    }, [])

    useEffect(() => {
        console.log('###################################################################')
        console.log(file)
    }, [file])

    // @ts-ignore
    const onloadsuccess = (pdf) => {
        console.log("PDF Loaded", pdf.newPages)
    }

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
                    file !== undefined && <Viewer fileUrl={URL.createObjectURL(file)} />
                }
            </Worker>
        </div>
    )
}

export default ReadPdf