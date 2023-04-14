import React, { useEffect } from "react";
import { User } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginFields } from "../data/form-fields";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLoginHook } from "../hooks/useLoginHook";

export interface FormFieldsProps {
    name: string;
    placeholder: string;
    error: string;
    type: string;
    dropdown?: boolean
}

interface FormProps {
    fields: FormFieldsProps[];
    type: string;
    title: string;
    user: User | null;
    setUser: (user: User | null) => void;
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

const Form = ({ fields, type, title, user, setUser }: FormProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })

    // @ts-ignore
    const login = (data) => {
        console.log(data)
        if (data.email && data.password) {
            useLoginHook(data, setUser)
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
            </div>
        </div>
    );
};

export default Form;
