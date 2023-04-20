import axios from "axios";
import { useContext } from "react";
import { MyContext } from "./MyContextProvider";

const Header = () => {

    const {setUser} = useContext(MyContext)

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
                console.log('Progress on the logging out thingie')
                if (res.status === 204) {
                    setUser(null)
                    console.log("You were logged out successifully")
                    return
                }
            })
            .catch(err => {
                if(err.response) {
                    console.log(err.response.data.error)
                    console.log(err.response.status)
                    if(err.response.status === 403) {
                        setUser(null)
                    }
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
