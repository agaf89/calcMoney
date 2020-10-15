import React, { Component } from 'react'
import './MoneyListItem.css'

export default class MoneyListItem extends Component{

    render(){
        const {label, status, isProfit=false, date, onDelete}=this.props
        let classNames = 'moneyListItem_status';
        if(isProfit){
            classNames+= ' plusMoney'
        } else{
            classNames+= ' minusMoney'
        }
        let formatter = new Intl.DateTimeFormat("ru", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
          });
        
        return(
        <>
            <div className='moneyListItem_descr'>
                <span>{isProfit || label==='🤷'  ? label : '-' + label}</span>
                <div className="moneyListItem_date">{formatter.format(date)}</div>
                <div className={classNames}>{status}</div>
            </div>
            <button onClick={onDelete} type='button' className='btn-trash'>
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="#DD4124" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
            </button>
        </>
        )
    }
}


