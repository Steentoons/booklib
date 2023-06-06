import axios from "axios";
import { User, BooksType, MyContext } from "../components/MyContextProvider";
import { useContext } from "react";

export interface LoginType {
    email: string;
    password: string;
}

export const useLoginHook = (data: LoginType, setUser: (user: User | null) => void, setBooks: (books: BooksType[]) => void, setSuccess: (success: string | undefined) => void, setError: (error: string | undefined) => void) => {
    axios.post('http://localhost:3000/api/authentication/login', data, { withCredentials: true })
        .then(res => {
            if (res.status === 200) {
                setUser(res.data.data)
                setSuccess('You were logged in successifully')
            }
        })
        .catch(err => {
            if (err.response) {
                setError(err.response.data.error)
            } else {
                setError('There was an error when trying to login')
            }
        })
}