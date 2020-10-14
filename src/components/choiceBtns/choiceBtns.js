import React from 'react'
import './choiceBtns.css'
const choiceBtns = () =>{
    return(
        <div className="choice">
            <h3>Что будем делать?</h3>
            <div className='choice-btns'>
                <button className='choice-item_btn'>Заработал</button>
                <button className='choice-item_btn cost'>Потратил</button>
            </div>
        </div>
    )
}

export default choiceBtns;