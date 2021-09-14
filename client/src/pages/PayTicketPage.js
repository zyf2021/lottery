import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hooks'

import { useHistory, useParams } from 'react-router-dom'
import { useMessage } from '../hooks/message.hook'


import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from '../components/CheckoutForm'

//const config = require('config')
const promise = loadStripe('pk_test_51JSGYHDrIIHnRlXN02dfEZpRpPuwZmH6V11Xg8IZ4FMC6QbXnQ3WqXKpK7bgkXTtnW7zJPxsBkSreQT6XZHUw2pl00haIdWGvU')

export const PayTicketPage = () => {
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    
    const idTicket = useParams().id

    useEffect(() => {
        message(error)
        clearError()
      }, [error, message, clearError])
    
      //делает активными текстовые поля на окне входа   
    useEffect(() => {
        window.M.updateTextFields()
      }, [])

    return (
        <div className="container">
            <div>{idTicket}</div>
            <div className="col s8 offset-s2">
                <Elements stripe={promise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    )
}