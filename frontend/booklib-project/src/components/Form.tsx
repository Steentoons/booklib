import React from "react";

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
}

const Form = ({ fields, type, title }: FormProps) => {
    const printInputs = fields.map((field, idx) => {
        return <input key={idx} className="form-input-layout" type={field.type} placeholder={field.placeholder} />
    })
    return (
        <div className="form-wrapper-layout">
            <div className="form-layout">
                <form className="font-regular" >
                    <h2 className="type-form-title">{title}</h2>
                    {printInputs}
                    {type === 'addBook' ?
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
                            <button className="btn-primary secondary btn-full">Login</button>
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
