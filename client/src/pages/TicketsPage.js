import React, {useCallback, useContext, useEffect, useState} from 'react'
import { useHttp } from '../hooks/http.hooks'
import { AuthContext } from '../context/AuthContext'
import {TicketsList} from '../components/TicketsList'
import {Loader} from '../components/Loader'


export const TicketsPage = () => {
    const [tickets, setTickets] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchTickets = useCallback(async () => {
            try {
                const fetched = await request('api/tickets/', 'GET', null, {
                    Athorization: `Bearer ${token}`
                })
                setTickets(fetched)
            } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchTickets()
    }, [fetchTickets])
    
    if (loading) {
        return <Loader/>
    }

    return (
        <>
           {!loading && <TicketsList tickets = {tickets} />}
        </>
    )
}