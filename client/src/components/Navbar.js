import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <header>
        <nav>
            <div class="nav-wrapper amber darken-3">
            <a href="!#" class="brand-logo center">Лотерея</a>
            <ul id="nav-mobile" class="left hide-on-med-and-down">
              <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
              <li><a href="/create">Создать</a></li>
              <li><a href="/tickets">Список билетов</a></li>
              <li><a href="/profile">Профиль</a></li>
            </ul>   
            </div>
        </nav>
    </header>
  )
}