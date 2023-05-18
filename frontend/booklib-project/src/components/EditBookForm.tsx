import React, { useContext } from 'react'
import axios from 'axios'
import { FormFieldsProps } from './Form'
import { registerFields } from '../data/form-fields'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { useLoginHook } from '../hooks/useLoginHook'
import { Link } from 'react-router-dom'
import { MyContext } from './MyContextProvider'

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required('Please enter your email'),
    name: yup
        .string()
        .required('Please enter your name'),
    password: yup
        .string()
        .required('Please enter your a password'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'The passwords must match')
        .required('Please enter confirm password')

})
type FormData = yup.InferType<typeof schema>;

const EditBookForm = () => {

    const {setUser, setBooks} = useContext(MyContext)

    const { handleSubmit, register, formState: { errors }} = useForm<FormData>({
        resolver: yupResolver(schema)
    })

    // @ts-ignore
    const registerUser = (data) => {
        // e.preventDefault()
        if(data.email && data.name && data.password && data.confirmPassword) {
            const newData = {
                email: data.email,
                name: data.name,
                password: data.password
            }

            console.log("It passes through here")

            axios.post('http://localhost:3000/api/register', newData, { withCredentials: true })
                .then(res => {
                    if (res.status === 201) {
                        console.log(res.data)
                        console.log(res.data.message)
                        useLoginHook(data, setUser, setBooks)
                    } 
                })
                .catch(err => {
                    if (err.response) {
                        console.log(err.response.data.error)
                    }
                    console.log("There was a problem when signing up")
                })
        }
    }
    
    return (
        <div className="form-wrapper-layout">
            <div className="form-layout">
                <form onSubmit={handleSubmit(registerUser)} className="font-regular" >
                    <h2 className="type-form-title">Sign Up to Booklib</h2>
                    <input type='email' {...register('email')} autoComplete="off" className="form-input-layout" placeholder='Enter your email' />
                    {errors.email && <p className="error-input">{errors.email?.message}</p>}
                    <input type='text' {...register('name')} autoComplete="off" className="form-input-layout" placeholder='Enter your name' />
                    {errors.name && <p className="error-input">{errors.name?.message}</p>}
                    <input type='password' {...register('password')} autoComplete="off" className="form-input-layout" placeholder='Enter your password' />
                    {errors.password && <p className="error-input">{errors.password?.message}</p>}
                    <input type='password' {...register('confirmPassword')} autoComplete="off" className="form-input-layout" placeholder='Enter your confirm password' />
                    {errors.confirmPassword && <p className="error-input">{errors.confirmPassword?.message}</p>}
                    <button className="btn-primary secondary btn-full">Sign Up</button>
                </form>
                <div className="input-layout read-book-layout">
                    <Link to='/login'><button className="btn-primary tertiary btn-full">Sign in</button></Link>
                </div>
            </div>
        </div>
    )
}

export default EditBookForm