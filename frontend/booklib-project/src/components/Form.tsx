import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginFields } from "../data/form-fields";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLoginHook } from "../hooks/useLoginHook";
import { MyContext } from "./MyContextProvider";

export interface FormFieldsProps {
    name: string;
    placeholder: string;
    error: string;
    type: string;
    dropdown?: boolean
}

// const schema = yup.object({
//     email: yup.string().required('Please enter your email'),
//     password: yup.string().required('Please enter your password'),
// }).required()

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email address")
        .required('Please enter your email'),
    password: yup
        .string()
        .required('Please enter your password')
})


type FormData = yup.InferType<typeof schema>;

const Form = () => {

    const {setUser, setBooks, user, setError, setSuccess} = useContext(MyContext)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })

    // @ts-ignore
    const login = (data) => {
        if (data.email && data.password) {
            useLoginHook(data, setUser, setBooks, setSuccess, setError)
        }
    }

    const navigate = useNavigate()
    useEffect(() => {
        if (user !== null) {
            navigate("/")
        }
    })
    // const printInputs = loginFields.map((field, idx) => {
    //     return <input key={idx} className="form-input-layout" type={field.type} placeholder={field.placeholder} />
    // })

    return (
        <div className="form-wrapper-layout">
            <div className="form-layout">
                <form onSubmit={handleSubmit(login)} className="font-regular" >
                    <h2 className="type-form-title">Sign In to Booklib</h2>
                    <input type='email' {...register('email')} autoComplete="off" className="form-input-layout" placeholder='Enter your email' />
                    {errors.email && <p className="error-input">{errors.email?.message}</p>}
                    <input type='password' {...register('password')} autoComplete="off" className="form-input-layout" placeholder='Enter your password' />
                    {errors.password && <p className="error-input">{errors.password?.message}</p>}
                    <div className="input-layout">
                        <button type="submit" className="btn-primary secondary btn-full">Login</button>
                    </div>
                </form>
                <div className="input-layout read-book-layout">
                    <Link to='/register'><button className="btn-primary tertiary btn-full">Sign in</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Form;
