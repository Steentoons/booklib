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

    const { handleSubmit, register, formState: { errors }, setValue } = useForm()

    const getCoverImage = (image: string) => {
        axios.get(`http://localhost:3000/api/media/images/${image}`, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    return res.data
                }
            })
            .catch(err => {
                return undefined
            })
    }

    const getFile = (file: string) => {
        axios.get(`http://localhost:3000/api/media/files/${file}`, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    setValue('file', res.data)
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    useEffect(() => {
        console.log(currentBookId)
        // Fetching categories...
        axios.get("http://localhost:3000/api/categories", { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    setCategories([...res.data.categories])
                }
            })
            .catch(err => {
                if (err.response) {
                    setError(err.response.data.error)
                }

                setError('There was an error when getting categories')
            })

        // Auto filling the form...
        axios.get(`http://localhost:3000/api/formdata/edit-book/${currentBookId}`, { withCredentials: true })
            .then(res => {
                // Get the image...
                // axios.get('http://localhost:3000/api/', { withCredentials: true })
                // Get the file...
                // axios.get('http://localhost:3000/api/', { withCredentials: true })
                console.log(res.data.formdata)
                setValue('title', res.data.formdata.title)
                setValue('author', res.data.formdata.author)
                setValue('year', res.data.formdata.year)
                setValue('category', res.data.formdata.category)
                setSelectedCategory(res.data.formdata.category)

                // set them medias...
                // setValue('cover_image', getCoverImage(res.data.formdata.cover_image))
                // setValue('file', getFile(res.data.formdata.file))
            })
            .catch(err => {
                if (err.response) {
                    setError(err.response.status)
                }
                // setError("There was a problem when filling up the form")
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
        console.log(data)
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
                if (res.status === 201) {
                    setSuccess(res.data)
                    setSuccess(res.data.message)
                } else {
                    setError(res.data.error)
                }
            })
            .catch(err => {
                if (err.response) {
                    setError(err.response.data.error)
                }
                console.log(err.response.status)
                setError("There was an issue when adding a book")
            })
    }

    return (
        <div className="form-wrapper-layout">
            <div className="form-layout">
                {/*@ts-ignore */}
                <form encType='multipart/form-data' className="font-regular" onSubmit={handleSubmit(onSubmit)} >
                    <h2 className="type-form-title">Add book to library</h2>
                    <input className="form-input-layout" {...register('title', { required: true })} type='text' placeholder='Enter book title' />
                    {errors.title && <p className="error-input">Title field is required</p>}
                    <input className="form-input-layout" {...register('author', { required: true })} type='text' placeholder='Enter book author' />
                    {errors.author && <p className="error-input">Author field is required</p>}
                    <button type='button' onClick={() => setFillterOpen(!filterOpen)} {...register('category', { required: true })} value={selectedCategory?._id} className='dropdown-input'>{selectedCategory?.category ? selectedCategory.category : 'Select book category'}</button>
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

                {/* TODO - Only show the read book when form is in edit mode */}
                <div className="input-layout read-book-layout">
                    <button className="btn-primary tertiary btn-full">Read Book</button>
                </div>
            </div>
        </div>
    )
}

export default EditBookForm