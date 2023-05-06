import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { addBookFields } from '../data/form-fields'
import { FormFieldsProps } from './Form'
import { useForm, SubmitHandler } from 'react-hook-form'

interface addBookFormType {
    title: string;
    author: string;
    year: string;
    category: string;
    cover_image: string;
    file: string;
}

interface CategoryType {
    _id: string;
    category: string;
    __v: number;
}

interface SelectedCategoryType {
    _id: string;
    category: string;
}

const AddBookForm = () => {

    const [categories, setCategories] = useState<CategoryType[] | []>([])
    const [filterOpen, setFillterOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<SelectedCategoryType | undefined>(undefined)

    useEffect(() => {
        axios.get("http://localhost:3000/api/categories", { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    setCategories([...res.data.categories])
                }
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response.data.error)
                }

                console.log('There was an error when getting categories')
            })
    }, [])

    const [coverImage, setCoverImage] = useState(null)
    const [file, setFile] = useState(null)

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<addBookFormType>()
    const onSubmit: SubmitHandler<addBookFormType> = data => {
        console.log(data)
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('author', data.author)
        formData.append('year', data.year)
        formData.append('category', data.category)
        // @ts-ignore
        formData.append('cover_image', coverImage)
        // @ts-ignore
        formData.append('file', file)
        axios.post('http://localhost:3000/api/books', formData, { withCredentials: true })
            .then(res => {
                if (res.status === 201) {
                    console.log(res.data)
                    console.log(res.data.message)
                } else {
                    console.log(res.data.error)
                }
            })
            .catch(err => {
                if(err.response) {
                    console.log(err.response.data.error)
                }
                console.log("There was an issue when adding a book")
            })
    }

    const handleCategory = (id: string, category: string) => {
        setSelectedCategory({_id: id, category: category})
        setValue('category', id)
        setFillterOpen(false)
    }

    const printCategories = categories.map((category, idx) => {
        return <li key={idx} className='type-filter' onClick={() => handleCategory(category._id, category.category)}>{category.category}</li>
    })

    const handleCoverimageInput = e => {
        const files = e?.target.files
        if(files.length > 0) {
            setCoverImage(files[0])
        }
    }

    const handleFileInput = e => {
        const files = e?.target.files
        if(files.length > 0) {
            setFile(files[0])
        }
    }

    return (
        <div className="form-wrapper-layout">
            <div className="form-layout">
                <form className="font-regular" onSubmit={handleSubmit(onSubmit)} >
                    <h2 className="type-form-title">Add book to library</h2>
                    <input className="form-input-layout" {...register('title', { required: true })} type='text' placeholder='Enter book title' />
                    {errors.title && <p className="error-input">Title field is required</p>}
                    <input className="form-input-layout" {...register('author', { required: true })} type='text' placeholder='Enter book author' />
                    {errors.author && <p className="error-input">Author field is required</p>}
                    <button onClick={() => setFillterOpen(!filterOpen)} {...register('category', { required: true })} value={selectedCategory?._id} className='dropdown-input'>{selectedCategory?.category ? selectedCategory.category : 'Select book category'}</button>
                    {filterOpen && <div className='floating-category-filter-layout'>
                        <ul className='floating-filter-div'>
                            {printCategories}
                        </ul>
                    </div>}
                    {errors.category && <p className="error-input">Category field is required</p>}
                    <input className="form-input-layout" {...register('year', { required: true })} type='number' placeholder='Enter book year' />
                    {errors.year && <p className="error-input">Year field is required</p>}
                    <div className="input-layout mt-20">
                        <label htmlFor="cover-image" className="btn-primary tertiary btn-full">Add cover image
                            <input type='file' {...register('cover_image', { required: true })} onChange={(e) => handleCoverimageInput(e)} aria-label="Add cover image" role='textbox' className="btn-hidden" id="cover-image" />
                        </label>
                        {errors.cover_image && <p className="error-input mt-20">Cover image is required</p>}
                    </div>
                    <div className="input-layout mt-20">
                        <label htmlFor="file" className="btn-primary tertiary btn-full">Add book file
                            <input type='file' {...register('file', { required: true })} onChange={(e) => handleFileInput(e)} aria-label="Add book file" role='textbox' className="btn-hidden" id="file" />
                        </label>
                        {errors.file && <p className="error-input mt-20">File is required</p>}
                    </div>
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

export default AddBookForm