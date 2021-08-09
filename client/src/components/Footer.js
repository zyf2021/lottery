import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Footer = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <footer class="page-footer z-depth-2 amber darken-3">
                    <div class="container">
                        <div class="row">
                        <div class="col 12 s12">
                        </div>
                        </div>
                    </div>
                <div class="footer-copyright">
                    <div class="container">
                    © 2021 Copyright 
                    <ul className="right">
                      <li>
                        <a className=" grey-text text-lighten-4" href="/" onClick={logoutHandler}>Выйти</a>
                      </li>
                      <li>
                        <a className=" grey-text text-lighten-4" href='https://ru.freepik.com/photos/business'>Business фото создан(а) pressfoto - ru.freepik.com</a>
                      </li>
                      <li>
                        <a className=" grey-text text-lighten-4" href='https://ru.freepik.com/vectors/business'>Business вектор создан(а) fullvector - ru.freepik.com</a>
                      </li>
                    </ul>
                    </div>
                </div>
    </footer>
    
  )
}