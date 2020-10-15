import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import './app.css'

import AppHeader from '../app-header/app-header'
import ChoiceBtns from '../choiceBtns/choiceBtns'
import AddMoney from '../addMoney/addMoney'
import MoneyList from '../moneyList/moneyList'

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            data : [
                {label:'600', status:'заработал', isProfit: true, id: uuidv4(), date:new Date()},
                {label:'-3456', status:'потратил', isProfit: false, id:uuidv4(), date:new Date()},
                {label:'5421', status:'заработал', isProfit: true, id: uuidv4(), date:new Date()}
                ],
            isProfit : 'Введите сумму',
            isProfitBolean: null
        };
        this.onDelete = this.onDelete.bind(this)
        this.changeInputValue = this.changeInputValue.bind(this)
        this.addItem = this.addItem.bind(this)
    }
    onDelete (id){
        this.setState(({data})=>{
            const newArr = data.filter((obj) => obj.id !== id)
            return{
                data: newArr
            }
        })
    }
    changeInputValue(value,isProfitBoleanState){
        this.setState(()=>{
            const newisProfitBolean1 = isProfitBoleanState
            const newValue = value
            return{
                ...this.state.data,
                isProfit: newValue,
                isProfitBolean: newisProfitBolean1
            }
        })
        
    }
    addItem(valueForm){
        const formatter = new Intl.NumberFormat("ru", {
            style: "currency",
            currency: "RUB"
          });
        const statusValidate = this.state.isProfitBolean !== null ? this.state.isProfit :'Тратим или зарабатываем?'
        const labelValidate = this.state.isProfitBolean !== null ? formatter.format(valueForm)  : '🤷'
        
        const newItem = {
            label: labelValidate,
            isProfit: this.state.isProfitBolean,
            status: statusValidate ,
            id: uuidv4(),
            date:new Date()
        }
        console.log(newItem)
        console.log(statusValidate)
        this.setState(({data,isProfit,isProfitBolean})=>{
            const newArr = [...data, newItem]
            return {
                data: newArr,
                isProfit,
                isProfitBolean }
        })
    } 
    render(){
        
        return (
            <div className='app'>
                <AppHeader/>
                <ChoiceBtns isProfitBolean={this.state.isProfitBolean} changeInputValue={this.changeInputValue}/>
                <AddMoney onAdd={this.addItem} isProfit={this.state.isProfit}/>
                <MoneyList onDelete={this.onDelete} data={this.state.data}/>
            </div>
        )
    }
    
}

