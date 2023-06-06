import Header from "./components/Header"
import Form from "./components/Form"
import { useContext, useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import Library from "./pages/Library"
import NotFound from "./pages/NotFound"
import RegisterForm from "./components/RegisterForm"
import AddBookForm from "./components/AddBookForm"
import { MyContext } from "./components/MyContextProvider"
import ReadPdf from "./pages/ReadPdf"
import ReadEpub from "./pages/ReadEpub"
import EditBookForm from "./components/EditBookForm"
import AddCategoriesForm from "./components/AddCategoriesForm"
import Success from "./components/Success"
import Error from "./components/Error"
import {User} from "./components/MyContextProvider"
import { useLocation } from "react-router-dom"

function App() {
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
      <Header />
      {success && <Success success={success} />}
      {error && <Error error={error} />}
      <Routes>
        <Route path="/login" element={<Form />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/add-book" element={<AddBookForm />} />
        <Route path="/edit-book" element={<EditBookForm />} />
        <Route path="/add-category" element={<AddCategoriesForm />} />
        <Route path="/" element={<Library />} />
        <Route path="/read-pdf" element={<ReadPdf />} />
        <Route path="/read-epub" element={<ReadEpub />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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

export default App
