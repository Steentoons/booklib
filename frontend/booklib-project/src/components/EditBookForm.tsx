import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { FormFieldsProps } from './Form'
import { registerFields } from '../data/form-fields'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { useLoginHook } from '../hooks/useLoginHook'
import { Link } from 'react-router-dom'
import { MyContext } from './MyContextProvider'
import { CategoryType, SelectedCategoryType, addBookFormType } from './AddBookForm'
import Header from './Header'

interface EditBookFromInputs {

}

const EditBookForm = () => {

    const { setUser, setBooks, setError, setSuccess, currentBookId } = useContext(MyContext)

    const [currentImage, setCurrentImage] = useState<string | undefined>()
    const [currentFile, setCurrentFile] = useState<string | undefined>()

    const [categories, setCategories] = useState<CategoryType[] | []>([])
    const [filterOpen, setFillterOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<SelectedCategoryType | undefined>(undefined)
    const [coverImage, setCoverImage] = useState(null)
    const [file, setFile] = useState(null)
    const [currCategory, setCurrCategory] = useState("")

    const { handleSubmit, register, formState: { errors }, setValue } = useForm()

    useEffect(() => {
        // Fetching categories...
        axios.get("http://localhost:3000/api/categories", { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    setCategories([...res.data.categories])
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 403) {
                        setUser(null)
                        setError(err.response.data.error)
                    }
                } else {
                    setError('There was an error when getting categories')
                }
            })

        // Auto filling the form...
        axios.get(`http://localhost:3000/api/formdata/edit-book/${currentBookId}`, { withCredentials: true })
            .then(res => {
                setValue('title', res.data.formdata.title)
                setValue('author', res.data.formdata.author)
                setValue('year', res.data.formdata.year)
                setValue('category', res.data.formdata.category)
                setSelectedCategory(res.data.formdata.category)

                // fetch category...
                axios.get(`http://localhost:3000/api/categories/${res.data.formdata.category}`, { withCredentials: true })
                    .then(response => {
                        if (response.status === 200) {
                            setCurrCategory(response.data.category[0].category)
                        } else {
                            setError('There was an error when getting the category')
                        }
                    })
                    .catch(err => {
                        if (err.response) {
                            if (err.response.status === 403) {
                                setUser(null)
                                setError(err.response.data.error)
                            }
                        } else {
                            setError('There was an error when getting the category')
                        }
                    })
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 403) {
                        setUser(null)
                        setError(err.response.data.error)
                    }
                } else {
                    setError("There was a problem when filling up the form")
                }
            })
    }, [])

    const handleCategory = (id: string, category: string) => {
        setSelectedCategory({ _id: id, category: category })
        setValue('category', id)
        setFillterOpen(false)
    }

    const printCategories = categories.map((category, idx) => {
        return <li key={idx} className='type-filter' onClick={() => handleCategory(category._id, category.category)}>{category.category}</li>
    })

    // @ts-ignore
    // const handleCoverimageInput = e => {
    //     const files = e?.target.files
    //     if (files.length > 0) {
    //         // setCoverImage(files[0])
    //         setValue('cover_image', files[0])
    //     }
    // }

    // @ts-ignore
    // const handleFileInput = e => {
    //     const files = e?.target.files
    //     if (files.length > 0) {
    //         // setFile(files[0])
    //         setValue('file', files[0])
    //     }
    // }

    const onSubmit: SubmitHandler<addBookFormType> = data => {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('author', data.author)
        formData.append('year', data.year)
        formData.append('category', data.category)
        // @ts-ignore
        // formData.append('cover_image', data.cover_image)
        // @ts-ignore
        // formData.append('file', data.file)
        axios.put(`http://localhost:3000/api/books/${currentBookId}`, formData, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    setSuccess(res.data)
                    setSuccess(res.data.message)
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 403) {
                        setUser(null)
                        setError(err.response.data.error)
                    }
                } else {
                    setError("There was an issue when adding a book")
                }
            })
    }

    return (
        <>
            {/*<Header/>*/}
            <div className="form-wrapper-layout">
                <div className="form-layout">
                    {/*@ts-ignore */}
                    <form encType='multipart/form-data' className="font-regular" onSubmit={handleSubmit(onSubmit)} >
                        <h2 className="type-form-title">Add book to library</h2>
                        <input className="form-input-layout" {...register('title', { required: true })} type='text' placeholder='Enter book title' />
                        {errors.title && <p className="error-input">Title field is required</p>}
                        <input className="form-input-layout" {...register('author', { required: true })} type='text' placeholder='Enter book author' />
                        {errors.author && <p className="error-input">Author field is required</p>}
                        <button type='button' onClick={() => setFillterOpen(!filterOpen)} {...register('category', { required: true })} value={currCategory ? currCategory : selectedCategory?._id} className='dropdown-input'>{selectedCategory?.category ? selectedCategory.category : currCategory}</button>
                        {filterOpen && <div className='floating-category-filter-layout'>
                            <ul className='floating-filter-div'>
                                {printCategories}
                            </ul>
                        </div>}
                        {errors.category && <p className="error-input">Category field is required</p>}
                        <input className="form-input-layout" {...register('year', { required: true })} type='number' placeholder='Enter book year' />
                        {errors.year && <p className="error-input">Year field is required</p>}
                        {/* <div className="input-layout mt-20">
                        <label htmlFor="cover-image" className="btn-primary tertiary btn-full">Add cover image
                            <input type='file' {...register('cover_image', { required: false })} onChange={(e) => handleCoverimageInput(e)} aria-label="Add cover image" role='textbox' className="btn-hidden" id="cover-image" />
                        </label>
                        {errors.cover_image && <p className="error-input mt-20">Cover image is required</p>}
                    </div> */}
                        {/* <div className="input-layout mt-20">
                        <label htmlFor="file" className="btn-primary tertiary btn-full">Add book file
                            <input type='file' {...register('file', { required: false })} onChange={(e) => handleFileInput(e)} aria-label="Add book file" role='textbox' className="btn-hidden" id="file" accept=".pdf,.epub" />
                        </label>
                        {errors.file && <p className="error-input mt-20">File is required</p>}
                    </div> */}
                        <div className="input-layout">
                            <button className="btn-primary secondary btn-full" type='submit'>Submit book</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditBookForm