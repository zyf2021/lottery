import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hooks'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'
import { useMessage } from '../hooks/message.hook'

export const CreatePage = () => {
    const history = useHistory()
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const auth = useContext(AuthContext)
    const [ticket, setTicket] = useState({
        ticket1: '', ticket2:'', ticket3:'', ticket4:'', ticket5:''
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
        setTicket({ ...ticket, [event.target.name]: event.target.value})
    }
    const createHandler = async event => {//async?
        try {
            const data = await request ('/api/tickets/create', 'POST', {...ticket}, {
                Authorization: `Bearer ${auth.token}`
            })
            message(data.message)
            console.log('Data', data)
            //history.push(`/list`)
        } catch (e) {}
    }
    return (
        <div className="row">
            <div className="col s8 offset-s2">
                <div className="row">
                    <div class="input-field col s2">
                        <input id="ticket1" 
                            type="text" 
                            class="validate"
                            //placeholder = "Введите номер билета"
                            name = "ticket1"
                            onChange = {changeHandler}/>
                        <label for="ticket1">00</label>
                    </div>
                    <div class="input-field col s2">
                        <input id="ticket2" 
                            type="text" 
                            class="validate"
                            //placeholder = "Введите номер билета"
                            name = "ticket2"
                            onChange = {changeHandler}/>
                        <label for="ticket2">00</label>
                    </div>
                    <div class="input-field col s2">
                        <input id="ticket3" 
                            type="text" 
                            class="validate"
                            //placeholder = "Введите номер билета"
                            name = "ticket3"
                            onChange = {changeHandler}/>
                        <label for="ticket3">00</label>
                    </div>
                    <div class="input-field col s2">
                        <input id="ticket4" 
                            type="text" 
                            class="validate"
                            //placeholder = "Введите номер билета"
                            name = "ticket4"
                            onChange = {changeHandler}/>
                        <label for="ticket4">00</label>
                    </div>
                    <div class="input-field col s2">
                        <input id="ticket5" 
                            type="text" 
                            class="validate"
                            //placeholder = "Введите номер билета"
                            name = "ticket5"
                            onChange = {changeHandler}/>
                        <label for="ticket5">00</label>
                    </div>
                    <button className="btn amber lighten-1"
                                onClick = {createHandler}
                                >
                            Создать билет
                    </button>
                </div>
            </div>
        </div>
    )
}