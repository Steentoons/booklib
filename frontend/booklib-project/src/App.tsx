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

// Try incoorporating clerk into the app...
import { ClerkProvider, useUser } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/clerk-react";

const App = () => {
  const { user, error, success, setError, setSuccess, pdfUrl, epubUrl } = useContext(MyContext)
  const navigate = useNavigate()

  const { isSignedIn } = useUser();

  // check env values
  // useEffect(() => {
  //   console.log(import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY)
  // }, [])

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

  useEffect(() => {
    if (pdfUrl) {
      navigate('/read-pdf')
    }
  }, [pdfUrl])

  useEffect(() => {
    if (epubUrl) {
      navigate('/read-epub')
    }
  }, [epubUrl])

  // Introducing Clerk
  if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
    // @ts-ignore
    throw new Error("Missing Publishable Key")
  }

  // const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

  return (
    <>
      {/* {user && <ProtectedRoutes />} */}
      {error && <Error error={error} />}
      {success && <Success success={success} />}
      {!!isSignedIn && <>
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
      </>}{!isSignedIn && <div className='signin-button-container'>
          <SignInButton />
        </div>}
    </>
  )
}

export default App