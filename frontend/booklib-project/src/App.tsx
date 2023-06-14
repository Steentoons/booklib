import React, { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes'
import { MyContext } from './components/MyContextProvider'
import Header from './components/Header'
import RegisterForm from './components/RegisterForm'
import AddBookForm from './components/AddBookForm'
import EditBookForm from './components/EditBookForm'
import AddCategoriesForm from './components/AddCategoriesForm'
import Library from './pages/Library'
import ReadPdf from './pages/ReadPdf'
import ReadEpub from './pages/ReadEpub'
import NotFound from './pages/NotFound'
import MyProtectedRoute from './components/MyProtectedRoutes'
import Form from './components/Form'
import Success from './components/Success'
import Error from './components/Error'

const App = () => {
  const { user, error, success, setError, setSuccess } = useContext(MyContext)
  // const navigate = useNavigate()
  // useEffect(() => {
  //   console.log(user)
  //   if(user === null) {
  //     navigate('/login')
  //   } else {
  //     navigate('/library')
  //   }
  // }, [user])

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(undefined)
      }, 4000)
    }
  }, [error])

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(undefined)
      }, 4000)
    }
  }, [success])

  return (
    <>
      {/* {user && <ProtectedRoutes />} */}
      {error && <Error error={error} />}
      {error && <Success success={success} />}
      {user ? <>
        <Header />
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
      </> : <Form />}
    </>
  )
}

export default App