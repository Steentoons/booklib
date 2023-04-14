import Header from "./components/Header"
import Form, { FormFieldsProps } from "./components/Form"
import { useEffect, useState } from "react"
import { addBookfields } from "./data/data"
import { Route, Routes } from "react-router-dom"
import Library from "./pages/Library"
import NotFound from "./pages/NotFound"
import RegisterForm from "./components/RegisterForm"
import AddBookForm from "./components/AddBookForm"

export interface User {
  name: string;
  email: string;
}

function App() {
  const handleLocalStorage = () => {
    const userValue = localStorage.getItem("user")
    if (userValue === null || userValue.length === 0) {
      return null
    } else {

      console.log(userValue)
      const parsedUser = JSON.parse(userValue)

      return parsedUser
    }
  }
  const [user, setUser] = useState<User | null>(handleLocalStorage())

  useEffect(() => {
    console.log("This was checked on the user change to:")
    console.log(user)
    if (user === null) {
      localStorage.setItem("user", '')
    } else {
      localStorage.setItem("user", JSON.stringify(user))
    }
  }, [user])
  
  const [fieldsState, setFieldsState] = useState<FormFieldsProps[]>(addBookfields)
  return (
    <div className="type-normal">
      <Header setUser={setUser} />
      <Routes>
        <Route path="/login" element={<Form fields={fieldsState} type='addBook' title='Add a book' user={user} setUser={setUser} />} />
        <Route path="/register" element={<RegisterForm setUser={setUser} />} />
        <Route path="/add-book" element={<AddBookForm />} />
        <Route path="/" element={<Library user={user} setUser={setUser} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
