import React from 'react'
import {Link} from 'react-router-dom'

export const TicketsList = ({ tickets }) => {
  if (!tickets.length) {
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
            <td>{ticket.owner}</td>
            <td>{ticket.ticket1}</td>
            <td>{ticket.ticket2}</td>
            <td>{ticket.ticket3}</td>
            <td>{ticket.ticket4}</td>
            <td>{ticket.ticket5}</td>
            <td>ДД/ММ/ГГГГ</td>
            <td>ДД/ММ/ГГГГ</td>
            <td>Не оплачен</td>
            <td>
            <Link to={`/`}>Удалить</Link>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}