import Header from "./components/Header"
import Form, { FormFieldsProps } from "./components/Form"
import { createContext, useContext, useEffect, useState } from "react"
import { addBookfields } from "./data/data"
import { Route, Routes, useNavigate } from "react-router-dom"
import Library from "./pages/Library"
import NotFound from "./pages/NotFound"
import RegisterForm from "./components/RegisterForm"
import AddBookForm from "./components/AddBookForm"
import { MyContextProvider, MyContext } from "./components/MyContextProvider"
import ReadPdf from "./pages/ReadPdf"
import ReadEpub from "./pages/ReadEpub"

function App() {
  const { user, pdfUrl, epubUrl } = useContext(MyContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user === null) {
      localStorage.setItem("user", '')
    } else {
      localStorage.setItem("user", JSON.stringify(user))
    }
  }, [user])

  useEffect(() => {
    if (pdfUrl) {
      navigate('/read-pdf', { state: { pdfUrl } });
    }
  }, [pdfUrl, navigate]);

  useEffect(() => {
    if (epubUrl) {
      navigate('/read-epub', { state: { epubUrl } });
    }
  }, [epubUrl, navigate]);
  return (
    <div className="type-normal">
      <Header />
      <Routes>
        <Route path="/login" element={<Form />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/add-book" element={<AddBookForm />} />
        <Route path="/" element={<Library />} />
        <Route path="/read-pdf" element={<ReadPdf />} />
        <Route path="/read-epub" element={<ReadEpub />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
