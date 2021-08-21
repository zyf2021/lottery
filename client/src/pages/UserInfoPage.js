import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
//import {Profile} from '../components/Profile'
import { useHttp } from '../hooks/http.hooks'

export const UserInfoPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const[user, setUser] = useState(null)
    const userId = useParams().id

    const getUser = useCallback(async() => {
        try {
            const fetched = await request(`/api/user/info`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUser(fetched)
        } catch (e) {
            
        }
    }, [token, userId, request])
    

    useEffect(() => {
        getUser()
      }, [getUser])
    
      if (loading) {
        return <Loader />
      }

    return(   
            <>
                Информация об одном пользователе
            </>
    )
}