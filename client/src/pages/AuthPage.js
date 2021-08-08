//import React from 'react'
import React, {useEffect, useState, useContext} from 'react'
import { useHistory } from 'react-router'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hooks'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email:'', password:''
    })

    useEffect(() => {
        message(error)
        clearError()
      }, [error, message, clearError])
    
      //делает активными текстовые поля на окне входа   
      useEffect(() => {
        window.M.updateTextFields()
      }, [])

    const changeHandler = event =>{
        setForm({ ...form, [event.target.name]: event.target.value})
    }
    
    const loginHandler = async () => {
        try {
           const data = await request ('/api/auth/login', 'POST', {...form})
           // message(data.message)
           //console.log('Data', data.userId)
           auth.login(data.token, data.userId)
           history.push(`/create`)//типа перенаправление на страницу main/:id
        } catch (e) {}
    }

    return (
        <div className = "row">
        <div className = "col s6 offset-s3 center-align">
            <h1>Лотерея</h1>
            <div className="card medium white darken-1 z-depth-2">
                <div className="card-image center-align" style = {{padding:10}}>
                    
                        <span className="card-title white-text text-accent-4 ">Авторизация</span>
                </div>
                <div className="card-content auth-page" >
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="email" 
                                   type="email" 
                                   class="validate" 
                                   name="email" 
                                   className="orange-input" 
                                   onChange = {changeHandler}
                                   />
                            <label for="email">Email</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="password" 
                                   type="password" 
                                   class="validate" 
                                   name = "password" 
                                   className="orange-input" 
                                   onChange = {changeHandler}
                                   />
                            <label for="password">Пароль</label>
                        </div>
                    </div>
                </div>
                <div className="card-action">
                    <button className="btn yellow darken-4" 
                            style = {{marginRight:10}}
                            onClick = {loginHandler}
                            disabled = {loading}
                            >
                                Вход
                    </button>
                    <a href = "/registration">Регистрация</a>
                </div>
            </div>
        </div>
    </div>
    )
}