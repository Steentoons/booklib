import React, { useEffect } from "react";
import { User } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export interface FormFieldsProps {
    name: string;
    placeholder: string;
    error: string;
    type: string;
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
    const printInputs = fields.map((field, idx) => {
        return <input key={idx} className="form-input-layout" type={field.type} placeholder={field.placeholder} />
    })

    // @ts-ignore
    const login=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3000/api/authentication/login', {
            email: 'genius2@gmail.com',
            password: 'Password1'
        }, {withCredentials: true})
            .then(res => {
                if(res.status === 200) {
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
                    <h2 className="type-form-title">{title}</h2>
                    {printInputs}
                    {/* {type === 'addBook' ? */}
                    {type === '' ?
                        (
                            <>
                                <div className="input-layout">
                                    <label htmlFor="cover-image" className="btn-primary secondary btn-full">Add cover image
                                        <input type='file' aria-label="Add cover image" role='textbox' className="btn-hidden" id="cover-image" />
                                    </label>
                                </div>
                                <div className="input-layout">
                                    <button className="btn-primary secondary btn-full">Add book</button>
                                </div>
                            </>
                        )
                        :
                        (
                            <button onClick={(e) => login(e)} className="btn-primary secondary btn-full">Login</button>
                        )}
                </form>
                {
                    type === 'addBook' && <div className="input-layout read-book-layout">
                        <button className="btn-primary tertiary btn-full">Read Book</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Form;
