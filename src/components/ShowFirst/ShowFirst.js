import React from 'react'
import './ShowFirst.css'

const showFirst = () =>{
    return (
        <div className='showFirst'>
            <div className='showFirst__title'><b>{localStorage.getItem('login')}</b>, время посчитать денежки!</div>
            <div className='showFirst__subtitle'>Ваш лист расчетов пуст</div>
        </div>
    )
}

export default showFirst