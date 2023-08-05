import axios from "axios";
import { useContext, useState } from "react";
import { MyContext } from "./MyContextProvider";
import { Link, useNavigate } from "react-router-dom";
import mobileBars from '../assets/images/bars.png';

const Header = () => {

    const { setUser, setBooks, setError, setSuccess, setPdfUrl, setEpubUrl } = useContext(MyContext)
    const navigate = useNavigate()
    const [mobileNav, setMobileNav] = useState(false)
    const [activeNav, setActiveNav] = useState('my-book')

    const getBooks = () => {
        axios.get('http://localhost:3000/api/books', { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    setSuccess('There were books fetched')
                    setBooks([...res.data.books])
                }
            })
            .catch(err => {
                if (err.response) {
                    if(err.response.status === 403) {
                        setUser(null)
                        setError(err.response.data.error)
                    }
                } else {
                    setError('There was an uncaught error when fetching books')
                }
            })
    }

    // @ts-ignore
    const logout = () => {
        axios.put('http://localhost:3000/api/authentication/logout', null, { withCredentials: true })
            .then(res => {
                if (res.status === 201) {
                    setUser(null)
                    setSuccess("You were logged out successifully")
                    return
                }
            })
            .catch(err => {
                if (err.response) {
                    setError(err.response.data.error)
                    if (err.response.status === 403) {
                        setUser(null)
                    }
                } else {
                    setError("There was a problem when logging out")
                }
            })
    }

    const resetBookUrl = () => {
        setEpubUrl(undefined)
        setPdfUrl(undefined)
    }

    return <header>
        <div className="header_layout">
            <h1 className="type-logo">booklib</h1>
            <nav className="desktop-nav">
                <ul>
                    <Link to='/' onClickCapture={() => resetBookUrl()}><li className={`type-bold ${activeNav === 'my-book' ? 'active-desktop-nav' : ''}`} onClick={() => setActiveNav('my-book')}>My Books</li></Link>
                    <Link to='/add-book' onClickCapture={() => resetBookUrl()}><li className={`type-bold ${activeNav === 'new-book' ? 'active-desktop-nav' : ''}`} onClick={() => setActiveNav('new-book')}>New book</li></Link>
                    <Link to='/add-category' onClickCapture={() => resetBookUrl()}><li className={`type-bold ${activeNav === 'new-category' ? 'active-desktop-nav' : ''}`} onClick={() => setActiveNav('new-category')}>New category</li></Link>
                    <li onClickCapture={() => resetBookUrl()} className={`type-bold ${activeNav === 'logout' ? 'active-desktop-nav' : ''}`} onClick={() => {logout(); setActiveNav('logout')}}>Logout</li>
                </ul>
            </nav>
            <img className="bars" src={mobileBars} alt="mobile bars" onClick={() => setMobileNav(!mobileNav)} />

        </div>
        {mobileNav && <div className="mobile-nav">
            <nav>
                <ul>
                    <Link to='/' onClickCapture={() => {resetBookUrl(); setMobileNav(!mobileNav)}}><li className={`type-bold ${activeNav === 'my-book' ? 'active-desktop-nav' : ''}`}>My Books</li></Link>
                    <Link to='/add-book' onClickCapture={() => {resetBookUrl(); setMobileNav(!mobileNav)}}><li className={`type-bold ${activeNav === 'my-book' ? 'active-desktop-nav' : ''}`}>New book</li></Link>
                    <Link to='/add-category' onClickCapture={() => {resetBookUrl(); setMobileNav(!mobileNav)}}><li className={`type-bold ${activeNav === 'my-book' ? 'active-desktop-nav' : ''}`}>New category</li></Link>
                    <li className={`type-bold ${activeNav === 'my-book' ? 'active-desktop-nav' : ''}`} onClick={() => {logout(); resetBookUrl(); setMobileNav(!mobileNav)}}>Logout</li>
                </ul>
            </nav>
        </div>}
    </header>;
};

export default Header;
