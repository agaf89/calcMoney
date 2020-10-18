import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import './app.css'

import AppHeader from '../app-header/app-header'
import AuthForm from '../authForm/authForm'
import ChoiceBtns from '../choiceBtns/choiceBtns'
import AddMoney from '../addMoney/addMoney'
import MoneyList from '../moneyList/moneyList'
import ShowFirst from '../ShowFirst/ShowFirst'
import '../geoLocation/geoLocation'

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            data : [],
            isProfit : 'Введите сумму',
            isProfitBolean: null,
            login: localStorage.getItem('login'),
            email: '',
            isAuth: false
        };
        this.onDelete = this.onDelete.bind(this)
        this.changeInputValue = this.changeInputValue.bind(this)
        this.addItem = this.addItem.bind(this)
        this.minusTotalMoney = this.minusTotalMoney.bind(this)
        this.plusTotalMoney = this.plusTotalMoney.bind(this)
        this.dataFormInput = this.dataFormInput.bind(this)
        this.minusItems = []
        this.totalMinus = null
        this.sumItems = []
        this.totalSum = null
        this.delPlusTotal = null
        this.delMinusTotal = null
        this.weather = []
        
        
    }
    
    onDelete (id){
        this.delPlusTotal = this.state.data.filter(item =>{
            return item.id===id
        })
        if(this.delPlusTotal[0].isProfit){
            this.totalSum = this.totalSum + (+('-' + this.delPlusTotal[0].label.replace(/\D/g, "")/100))
            JSON.stringify(localStorage.setItem('plus', this.totalSum))
        }
        this.delMinusTotal = this.state.data.filter(item =>{
            return item.id===id
        })
        if(!this.delMinusTotal[0].isProfit){
            this.totalMinus = this.totalMinus + (+('-' + this.delMinusTotal[0].label.replace(/\D/g, "")/100))  
            JSON.stringify(localStorage.setItem('minus', this.totalMinus))
        }
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
        //этот участок для валдиации вводимых данных
        const statusValidate = this.state.isProfitBolean !== null ? this.state.isProfit :'Тратим или зарабатываем?'
        let labelValidate = this.state.isProfitBolean !== null ? formatter.format(valueForm)  : '🤷'
        if (labelValidate !== '🤷' && !this.state.isProfitBolean){
            this.minusTotalMoney(valueForm);
            labelValidate = '-' + formatter.format(valueForm.replace(/\D/g, ""))
        }
        if (labelValidate !== '🤷' && this.state.isProfitBolean){
            this.plusTotalMoney(valueForm);
        }
        //формируем новый Item .replace(/\D/g, "")
        const newItem = {
            label: labelValidate,
            isProfit: this.state.isProfitBolean,
            status: statusValidate ,
            id: uuidv4(),
            date:new Date()
        }
        
        this.setState(({data,isProfit,isProfitBolean})=>{
            const newArr = [...data, newItem]
            localStorage.setItem('data', JSON.stringify ([...data, newItem]))
            console.log(JSON.parse(localStorage.getItem('data')))
            console.log([...data, newItem])
            return {
                data: newArr,
                isProfit,
                isProfitBolean }
        })
        
        
    }

    minusTotalMoney(sumItem){
        this.minusItems.push(+sumItem)
        this.totalMinus = this.minusItems.reduce((sum, i) =>{
            return sum + i
        })
        
    }
    plusTotalMoney(sumItem){
        this.sumItems.push(+sumItem)
        this.totalSum = this.sumItems.reduce((sum, i) =>{
            return sum + i
        })
        
    }
    dataFormInput(data){
        JSON.stringify(localStorage.setItem('login', data.name));
        this.setState({
            login: data.name,
            email: data.email,
            isAuth: true            
        })
    }
    
    render(){
        
        const moneyList = <MoneyList onDelete={this.onDelete} data={this.state.data}/>
        const helper = 
                    <>
                        <AppHeader login={this.state.login} totalSum={this.totalSum} totalMinus={this.totalMinus}/>
                        <ChoiceBtns isProfitBolean={this.state.isProfitBolean} changeInputValue={this.changeInputValue}/>
                        <AddMoney onAdd={this.addItem} isProfit={this.state.isProfit}/>
                        {this.state.data.length===0 ? <ShowFirst/> : moneyList }
                    </>  
            return (
                <div className='app'>
                    { JSON.parse((localStorage.getItem('isAuth'))) ?  helper  :  <AuthForm dataFormInput={this.dataFormInput}/>}
                </div>
            )    
    }
}


