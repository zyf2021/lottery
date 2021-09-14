import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'

import 'materialize-css'
import { AuthContext } from './context/AuthContext'
import {Navbar} from './components/Navbar'
import { Footer } from './components/Footer'
import { Loader } from './components/Loader'

function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready){
    return <Loader/>
  }

  return (
    <body>
    <AuthContext.Provider value = {{
      token, login, logout, userId, isAuthenticated
    }}>
      
        <Router>
          { isAuthenticated && <Navbar /> }
            <div className="container main">
              {routes}
            </div>
          { isAuthenticated && <Footer /> }
        </Router>
      
    </AuthContext.Provider>
    </body>
  )
}

export default App
