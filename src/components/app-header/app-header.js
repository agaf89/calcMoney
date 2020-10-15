import React from 'react';
import './app-header.css';

const AppHeader = () => {
    const date = new Date()
    let formatter = new Intl.DateTimeFormat("ru", {
        weekday: "long",
        hour: "numeric",
        minute: "numeric"
      });
    return (
        <div className='app-header'>
            <div className='app-header_name'>
                <h1>Agafonov Stanislav</h1>
                <span>{formatter.format(date)}</span>
            </div>
            <div className='app-header_money'>
                <div className="app-header_sum">
                    <h3 className="title">Доходы</h3>
                    <span className="money">45000 руб</span>
                </div>
                <div className="app-header_sum">
                    <h3 className="title">Расходы</h3>
                    <span className="money">-3425 руб</span>
                </div>
            </div>
        </div>
    )
}

export default AppHeader;