import Header from "./Header"
import Form from "./Form"
import { useContext, useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import Library from "../pages/Library"
import NotFound from "../pages/NotFound"
import RegisterForm from "./RegisterForm"
import AddBookForm from "./AddBookForm"
import { MyContext } from "./MyContextProvider"
import ReadPdf from "../pages/ReadPdf"
import ReadEpub from "../pages/ReadEpub"
import EditBookForm from "./EditBookForm"
import AddCategoriesForm from "./AddCategoriesForm"
import Success from "./Success"
import Error from "./Error"
import {User} from "./MyContextProvider"
import { useLocation } from "react-router-dom"

function ProtectedRoutes() {
  const { user, pdfUrl, epubUrl, success, setSuccess, error, setError, popup, setPopup } = useContext(MyContext)
  const navigate = useNavigate()
  const location = useLocation()

  // Setting the user...
  useEffect(() => {
    setUserFn(user)
  }, [user])

  // Navigating to pdf route...
  useEffect(() => {
    navigateBook(pdfUrl, navigate, '/read-pdf')
  }, [pdfUrl, navigate]);

  // Navigatin to epub route...
  useEffect(() => {
    navigateBook(epubUrl, navigate, '/read-epub')
  }, [epubUrl, navigate]);

  // Resetting error popup...
  useEffect(() => {
    popupReset(error, setError)
  }, [error])

  // Resetting success popup...
  useEffect(() => {
    popupReset(success, setSuccess)
  }, [success]) 

  // Resetting the popup...
  useEffect(() => {
    popupReset(popup, setPopup)
  }, [popup])

  return (
    <div className="type-normal">
      {success && <Success success={success} />}
      {error && <Error error={error} />}
    </div>
  )
}

function setUserFn (user: User | null) {
  if (user === null) {
    localStorage.setItem("user", '')
  } else {
    localStorage.setItem("user", JSON.stringify(user))
  }
}

// @ts-ignore
function navigateBook (url: string | undefined, navigate, route) {
  if (url) {
    navigate(route, { state: { url } });
  }
}

// @ts-ignore
function navigateEpub (epubUrl: string, navigate) {
  if (epubUrl) {
    navigate('/read-epub', { state: { epubUrl } });
  }
}

function popupReset (message: string | undefined, resetPopup: (error: string | undefined) => void ) {
  if(message) {
    setTimeout(() => {
      resetPopup(undefined)
    }, 3000);
  }
}

export default ProtectedRoutes
