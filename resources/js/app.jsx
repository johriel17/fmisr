import './bootstrap.jsx';
import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './Main.jsx'
import '../css/app.css'

import { AuthContextProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Main />
    </AuthContextProvider>
  </React.StrictMode>
)
