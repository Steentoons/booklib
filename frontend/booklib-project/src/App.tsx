import Header from "./components/Header"
import Form, { FormFieldsProps } from "./components/Form"
import { useState } from "react"
import { addBookfields } from "./data/data"
import { Route, Routes } from "react-router-dom"
import Library from "./pages/Library"
import NotFound from "./pages/NotFound"

function App() {
  const fields = [
    {
      name: 'title',
      placeholder: 'Enter book title',
      error: 'Book title is required',
      type: 'text'
    },
    {
      name: 'author',
      placeholder: 'Enter book author',
      error: 'Book author is required',
      type: 'text'
    },
    {
      name: 'category',
      placeholder: 'Select book category',
      error: 'Book category is required',
      type: 'text'
    },
    {
      name: 'year',
      placeholder: 'Enter book year',
      error: 'Book year is required',
      type: 'number'
    }
  ]
  const [fieldsState, setFieldsState] = useState<FormFieldsProps[]>(addBookfields)
  return (
    <div className="type-normal">
      <Header />
      <Routes>
        <Route path="/login" element={<Form fields={fieldsState} type='addBook' title='Add a book' />} />
        <Route path="/library" element={<Library />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
