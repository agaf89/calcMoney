import React from 'react'
import './moneyList.css'
import MoneyListItem from '../MoneyListItem/MoneyListItem'

const moneyList = ({data,onDelete})=>{
    const elements = data.map( item =>{
        return(
            <li key={item.id} className='moneyListItem'>
                <MoneyListItem onDelete={() => onDelete(item.id)}  {...item}/>
            </li>

        )
    }) 
    return(
        <ul className='moneyList'>
            {elements}
        </ul>
    )
}

export default moneyList