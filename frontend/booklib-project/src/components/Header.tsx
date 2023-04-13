import axios from "axios";
import { User } from "../App";

interface HeaderProps {
    setUser: (user: User | null) => void
}

const Header = ({setUser}: HeaderProps) => {

    const getBooks = () => {
        axios.get('http://localhost:3000/api/books', {withCredentials: true})
            .then(res => {
                if(res.status === 200) {
                    console.log('There were books fetched')
                    console.log(res.data.books)
                } else {
                    console.log("There was a problem when fetching the books")
                }
            })
    }

    // @ts-ignore
    const logout = () => {
        axios.delete('http://localhost:3000/api/authentication/logout', {withCredentials: true})
            .then(res => {
                console.log('Progress on the logging in thingie')
                if (res.status === 204) {
                    setUser(null)
                    console.log("You were logged out successifully")
                    return
                }

                console.log("There was a problem when logging out")
            })
    }

    return <div className="header_layout">
        <h1 className="type-logo">booklib</h1>
        <nav>
            <ul>
                {/* <li>Home</li> */}
                <li className="type-bold">New book</li>
                <li className="type-bold">New category</li>
                <li className="type-bold" onClick={() => getBooks()}>Books</li>
                <li className="type-bold">Categories</li>
                {/* <li>Login</li> */}
                <li className="type-bold" onClick={() => logout()}>Logout</li>
                {/* <li>Register</li> */}
            </ul>
        </nav>
    </div>;
};

export default Header;
