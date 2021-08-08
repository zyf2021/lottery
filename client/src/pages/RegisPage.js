import React, {useEffect, useState} from 'react'
import { useHttp } from '../hooks/http.hooks'
import { useMessage } from '../hooks/message.hook'

export const RegisPage = () => {
    const message = useMessage()
    const {loading, request,error, clearError} = useHttp()
    const [form, setForm] = useState({
        first_name: '', last_name:'', email:'', phone:'', password:''
    })

    useEffect(() => {
        message(error)
        clearError()
      }, [error, message, clearError])
    
      useEffect(() => {
        window.M.updateTextFields()
      }, [])

    const changeHandler = event =>{
        setForm({ ...form, [event.target.name]: event.target.value})
    }
    
    const registerHandler = async () => {
        try {
            const data = await request ('/api/auth/register', 'POST', {...form})
            message(data.message)
            console.log('Data', data)
        } catch (e) {}
    }

    return(
        <div className = "row">
            <div className = "col s6 offset-s3 center-align">
                <div class="card amber lighten-5 registration">
                    <div class="card-content black-text">
                    <span class="card-title">Регистрация</span>
                    <div class="row">
                        <form class="col s12">
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="first_name" 
                                           type="text" 
                                           class="validate"
                                           name = "first_name"
                                           onChange = {changeHandler}/>
                                    <label for="first_name">Имя</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="last_name" 
                                           type="text" 
                                           class="validate"
                                           name = "last_name"
                                           onChange = {changeHandler}/>
                                    <label for="last_name">Фамилия</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="email" 
                                           type="email" 
                                           class="validate"
                                           name = "email"
                                           onChange = {changeHandler}/>
                                    <label for="email">Email</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="phone" 
                                           type="text" 
                                           class="validate"
                                           name = "phone"
                                           onChange = {changeHandler}/>
                                    <label for="phone">Телефон</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                <input id="password" 
                                       type="password"
                                       class="validate"
                                       name = "password"
                                       onChange = {changeHandler}/>
                                <label for="password">Пароль</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
                    <div class="card-action">
                        <button className="btn amber lighten-1"
                                onClick = {registerHandler}
                                disabled = {loading}>
                            Зарегистрироваться
                        </button>
                        <a href = "/">Вход</a>
                    </div>
                </div>
            </div>
        </div>
    )
}