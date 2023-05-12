import React from 'react'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface Category {
    category: string;
}

const AddCategoriesForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Category>()

    const addCategory: SubmitHandler<Category> = (data) => {
        axios.post('http://localhost:3000/api/categories', data, {withCredentials: true})
            .then(res => {
                if(res.status === 201) {
                    console.log(res.data.message)
                }
            })
            .catch(err => {
                if(err.response) {
                    console.log(err.response.data.error)
                }

                console.log("There was a problem when adding a category")
            })
    }
  return (
    <div className="form-wrapper-layout">
            <div className="form-layout">
                <form onSubmit={handleSubmit(addCategory)} className="font-regular" >
                    <h2 className="type-form-title">Sign In to Booklib</h2>
                    <input type='text' {...register('category')} autoComplete="off" className="form-input-layout" placeholder='Enter new category name' />
                    {errors.category && <p className="error-input">{errors.category?.message}</p>}
                    <div className="input-layout">
                        <button type="submit" className="btn-primary secondary btn-full">Add category</button>
                    </div>
                </form>
                <div className="input-layout read-book-layout">
                    <Link to='/register'><button className="btn-primary tertiary btn-full">Sign in</button></Link>
                </div>
            </div>
        </div>
  )
}

export default AddCategoriesForm