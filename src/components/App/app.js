import React from "react";
import './app.css'

import AppHeader from '../app-header/app-header'
import ChoiceBtns from '../choiceBtns/choiceBtns'
import AddMoney from '../addMoney/addMoney'

const app = () =>{
    return (
        <div className='app'>
            <AppHeader/>
            <ChoiceBtns/>
            <AddMoney/>
        </div>
    )
}


export default app;