import React, {useEffect, useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import { useHttp } from '../hooks/http.hooks'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

const rendSwitch = (param) => {
  switch(param) {
    case 0: return 'Не оплачен';
    case 1: return 'Оплачен';
    case 2: return 'Проигран';
    case 3: return 'Выигран';
  }
}

export const TicketsList = ({tickets,user}) => {
  const {loading, request, error, clearError} = useHttp()
  const message = useMessage()
  const auth = useContext(AuthContext)

  const deleteHandler = async (ticket_id) => {
    try {
        console.log(auth)
        const data = await request(`api/tickets/delete/${ticket_id}`, 'DELETE', {
          Authorization: `Bearer ${auth.token}`
        })
        
    } catch (e) {}
  }

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])


  if (!tickets.length ) {
    return <p className="center">Ссылок пока нет</p>
  }
  



  return (
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Владелец</th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>Дата создания</th>
        <th>Дата оплаты</th>
        <th>Статус</th>
        <th>Удалить</th>
      </tr>
      </thead>

      <tbody>
      { tickets.map((ticket, index) => {
        return (
          <tr key={ticket._id}>
            <td>{index + 1}</td>
            <td>{user.first_name + ' ' + user.last_name}</td>
            <td>{ticket.ticket1}</td>
            <td>{ticket.ticket2}</td>
            <td>{ticket.ticket3}</td>
            <td>{ticket.ticket4}</td>
            <td>{ticket.ticket5}</td>
            <td>{ticket.createdAt}</td>
            <td>{ticket.date_pay}</td>
            <td> 
              {rendSwitch(ticket.status)}
            </td>
            <td>
              <button id = {index}
                      onClick = {() => deleteHandler(ticket._id)}
                      disabled = {loading}>
                        Удалить {index}
              </button>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}