import axios from "axios";
import { User } from "../App";

export interface LoginType {
    email: string;
    password: string;
}

export const useLoginHook = (data: LoginType, setUser: (user: User | null) => void) => {
    axios.post('http://localhost:3000/api/authentication/login', data, { withCredentials: true })
                .then(res => {
                    if (res.status === 200) {
                        console.log(res.data)
                        setTimeout(() => {
                            setUser(res.data.data)
                        }, 2000);
                    }
                })
                .catch(err => {
                    if (err.response) {
                        console.log(err.response.data.error)
                    }
                    console.log('There was an error when trying to login')
                })
}