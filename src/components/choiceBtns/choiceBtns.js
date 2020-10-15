import React from 'react'
import './choiceBtns.css'
const choiceBtns = ({changeInputValue,isProfitBolean}) =>{
    let isProfit = true;
    const isProfitClick = () =>{
        const isProfitBoleanState = true
        isProfit = 'Заработал'
        changeInputValue(isProfit,isProfitBoleanState)
    }
    const isCostClick = () =>{
        const isProfitBoleanState = false
        isProfit = 'Потратил'
        changeInputValue(isProfit,isProfitBoleanState)
    }
    return(
        <div className="choice">
            <h3>Что будем делать?</h3>
            <div className='choice-btns'>
                <button onClick={isProfitClick} type='button' className='choice-item_btn'>Заработал</button>
                <button onClick={isCostClick} type='button' className='choice-item_btn cost'>Потратил</button>
            </div>
        </div>
    )
}

export default choiceBtns;