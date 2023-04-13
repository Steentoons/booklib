import React, { useEffect } from "react";
import { User } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginFields } from "../data/form-fields";

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

const Form = ({ fields, type, title, user, setUser }: FormProps) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (user !== null) {
            navigate("/")
        }
    })
    const printInputs = loginFields.map((field, idx) => {
        return <input key={idx} className="form-input-layout" type={field.type} placeholder={field.placeholder} />
    })

    // @ts-ignore
    const login = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/api/authentication/login', {
            email: 'genius2@gmail.com',
            password: 'Password1'
        }, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    setUser(res.data.data)
                } else {
                    console.log(res)
                }
            })
    }

    return (
        <div className="form-wrapper-layout">
            <div className="form-layout">
                <form className="font-regular" >
                    <h2 className="type-form-title">Sign In to Booklib</h2>
                    {printInputs}
                    <div className="input-layout">
                        <button onClick={(e) => login(e)} className="btn-primary secondary btn-full">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
