import Header from "./components/Header"
import Form, { FormFieldsProps } from "./components/Form"
import { createContext, useContext, useEffect, useState } from "react"
import { addBookfields } from "./data/data"
import { Route, Routes } from "react-router-dom"
import Library from "./pages/Library"
import NotFound from "./pages/NotFound"
import RegisterForm from "./components/RegisterForm"
import AddBookForm from "./components/AddBookForm"
import {MyContextProvider, MyContext} from "./components/MyContextProvider"



function App() {
  const {user} = useContext(MyContext)

  useEffect(() => {
    if (user === null) {
      localStorage.setItem("user", '')
    } else {
      localStorage.setItem("user", JSON.stringify(user))
    }
  }, [user])
  return (
    <div className="type-normal">
      <Header />
      <Routes>
        <Route path="/login" element={<Form />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/add-book" element={<AddBookForm />} />
        <Route path="/" element={<Library />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
