import React from 'react'
import axios from 'axios'
import { FormFieldsProps } from './Form'
import { registerFields } from '../data/form-fields'

const RegisterForm = () => {
    // @ts-ignore
    const register = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/api/register', {
            email: 'genius2@gmail.com',
            password: 'Password1',
            name: 'steentoons'
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

    const printInputs = registerFields.map((field, idx) => {
        return <input key={idx} className="form-input-layout" type={field.type} placeholder={field.placeholder} />
    })

    return (
        <div className="form-wrapper-layout">
            <div className="form-layout">
                <form className="font-regular" >
                    <h2 className="type-form-title">Sign Up to Booklib</h2>
                    {printInputs}
                    <button onClick={(e) => register(e)} className="btn-primary secondary btn-full">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm