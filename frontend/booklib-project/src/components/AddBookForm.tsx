import React from 'react'
import axios from 'axios'
import { addBookFields } from '../data/form-fields'
import { FormFieldsProps } from './Form'

const AddBookForm = () => {
    // @ts-ignore
    const addBook = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/api/books', {
            title: 'genius2@gmail.com',
            author: 'Password1',
            year: '2023',
            category: 'history',
            cover_image: 'some cover image',
            file: 'some book',
        }, { withCredentials: true })
            .then(res => {
                if (res.status === 201) {
                    console.log(res.data)
                    console.log(res.data.message)
                } else {
                    console.log(res.data.error)
                }
            })
    }

    // @ts-ignore
    const dropdownCategories = (e) => {
        e.preventDefault()
    }

    const printInputs = addBookFields.map((field: FormFieldsProps, idx) => {
        if(field.dropdown) return <button key={idx} onClick={(e) => dropdownCategories(e)} className='dropdown-input'>Select book category</button>
        else return <input key={idx} className="form-input-layout" type={field.type} placeholder={field.placeholder} />
    })
    return (
        <div className="form-wrapper-layout">
            <div className="form-layout">
                <form className="font-regular" >
                    <h2 className="type-form-title">Add book to library</h2>
                    {printInputs}
                    <div className="input-layout">
                        <label htmlFor="cover-image" className="btn-primary secondary btn-full">Add cover image
                            <input type='file' aria-label="Add cover image" role='textbox' className="btn-hidden" id="cover-image" />
                        </label>
                    </div>
                    <div className="input-layout">
                        <button className="btn-primary secondary btn-full" onClick={(e) => addBook(e)}>Add book</button>
                    </div>
                </form>

                {/* TODO - Only show the read book when form is in edit mode */}
                <div className="input-layout read-book-layout">
                    <button className="btn-primary tertiary btn-full">Read Book</button>
                </div>
            </div>
        </div>
    )
}

export default AddBookForm