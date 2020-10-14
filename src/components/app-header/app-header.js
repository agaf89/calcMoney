import React from 'react';
import './app-header.css';

const AppHeader = () => {
    return (
        <div className='app-header'>
            <div className='app-header_name'>
                <h1>Agafonov Stanislav</h1>
                <span>20:45:10 12 октября 2020</span>
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