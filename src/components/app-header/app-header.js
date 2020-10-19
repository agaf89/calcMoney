import React from 'react';
import Geo from '../geoLocation/geoLocation'
import './app-header.css';

const AppHeader = ({totalMinus,totalSum,login}) => {
    const date = new Date()
    let formatter = new Intl.DateTimeFormat("ru", {
        weekday: "long",
        hour: "numeric",
        minute: "numeric"
    });
    let formatt = new Intl.NumberFormat("ru", {
        style: "currency",
        currency: "RUB" 
    });
   
    return (
        <div className='app-header'>
            <div className='app-header_name'>
                <h1>{login}</h1>
                <span>{formatter.format(date)}</span>
            </div>
            <Geo/>
            <div className='app-header_money'>
                <div className="app-header_sum">
                    <h3 className="title">Доходы</h3>
                    <span className="money">{formatt.format(totalSum)}</span>
                </div>
                <div className="app-header_sum">
                    <h3 className="title">Расходы</h3>
                    <span className="money minus">-{formatt.format(totalMinus)}</span>
                </div>
            </div>
        </div>
    )
}

export default AppHeader;