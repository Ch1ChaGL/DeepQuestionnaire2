import React from 'react'
import s from './Card.module.css'
function Card({user}) {
  return (
    <div className={s.container}>
        <div className={s.name}><span>ФИО</span>{user.FullName}</div>
        <div className={s.email}><span>Email</span>{user.Email}</div>
    </div>
  )
}

export default Card