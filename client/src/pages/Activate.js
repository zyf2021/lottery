import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from '../hooks/http.hooks'
import { useMessage } from '../hooks/message.hook'
import {useParams} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
//import axios from 'axios'

export const Activate = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const token = useParams().token
    const [err, setErr] = useState('') 
    const [success, setSuccess] = useState('')

    useEffect(() => {
        message(error)
        clearError()
      }, [error, message, clearError])

    useEffect(() => {
        if(token){
            const activationEmail = async () => {
                try {
                    const res = await request('/api/auth/activation','POST', {token})
                    message(res.message)
                    //const text = res.message
                } catch (e) {}
            }
            activationEmail()
        }
    },[token, request])

    //console.log(useParams().token)
    return(
        <div class="row">
            <div class="col s12 m6">
            <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                <span class="card-title">Активация аккаунта</span>
                <p>{auth.user}</p>
                </div>
                <div class="card-action">
                <a href = "/">Вход</a>
                </div>
            </div>
            </div>
        </div>
    )
}