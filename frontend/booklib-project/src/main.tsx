import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter as Router} from 'react-router-dom'
import './assets/sass/main.scss'
import {MyContextProvider} from './components/MyContextProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MyContextProvider>
    <Router>
      <App />
    </Router>
    </MyContextProvider>
  </React.StrictMode>,
)
