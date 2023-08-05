import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './assets/sass/main.scss'
import { MyContextProvider } from './components/MyContextProvider'
import AddBookForm from './components/AddBookForm'
import RegisterForm from './components/RegisterForm'
import EditBookForm from './components/EditBookForm'
import AddCategoriesForm from './components/AddCategoriesForm'
import Library from './pages/Library'
import ReadPdf from './pages/ReadPdf'
import ReadEpub from './pages/ReadEpub'
import NotFound from './pages/NotFound'
import Form from './components/Form'
import MyProtectedRoute from './components/MyProtectedRoutes'

import { ClerkProvider } from "@clerk/clerk-react";

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MyContextProvider>
      <Router>
      <ClerkProvider publishableKey={clerkPubKey}>
        <App />
        </ClerkProvider>
      </Router>
    </MyContextProvider>
  </React.StrictMode>
)
