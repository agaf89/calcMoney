import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import './app.css'

import AppHeader from '../app-header/app-header'
import AuthForm from '../authForm/authForm'
import ChoiceBtns from '../choiceBtns/choiceBtns'
import AddMoney from '../addMoney/addMoney'
import MoneyList from '../moneyList/moneyList'
import ShowFirst from '../ShowFirst/ShowFirst'
import Fetches from '../fireBase/fireBase'
import Spinner from '../spinner/spinner'
import '../fireBase/fireBase'
import '../geoLocation/geoLocation'


export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            data : [],
            isProfit : 'Введите сумму',
            isProfitBolean: null,
            login: localStorage.getItem('login'),
            email: localStorage.getItem('id'),
            isAuth: false,
            id_name: '',
            isLoad: false
        };
        
        this.onDelete = this.onDelete.bind(this)
        this.changeInputValue = this.changeInputValue.bind(this)
        this.addItem = this.addItem.bind(this)
        this.minusTotalMoney = this.minusTotalMoney.bind(this)
        this.plusTotalMoney = this.plusTotalMoney.bind(this)
        this.dataFormInput = this.dataFormInput.bind(this)
        this.minusItems = []
        this.totalMinus = localStorage.getItem('minus')
        this.sumItems = []
        this.totalSum =  localStorage.getItem('plus')
        this.delPlusTotal = null
        this.delMinusTotal = null
        this.weather = []
        this.fetches = new Fetches()
        
    }
    componentDidMount(){
        let a={}
            this.fetches.fetchGetSum().then(e => {
                if (!e){
                    return this.setState(()=>{
                        return {
                            isLoad: true
                        }
                    })
                } else{
                    a = Object.keys(e).filter( item =>{
                        return e[item].email===localStorage.getItem('email')
                    }).map(item => {
                        return {
                            ...e[item],
                            id_name: item
                        }
                    })
                    return this.setState(()=>{
                        return {
                            data: a,
                            isLoad: true
                        }
                    })
                } 
            })
        
    }
    onDelete (id){
        this.delPlusTotal = this.state.data.filter(item =>{
            return item.id===id
        })
        if(this.delPlusTotal[0].isProfit){
            this.totalSum = this.totalSum + (+('-' + this.delPlusTotal[0].label.replace(/\D/g, "")/100))
            
            localStorage.setItem('plus',JSON.stringify(this.totalSum) )
        }
        this.delMinusTotal = this.state.data.filter(item =>{
            return item.id===id
        })
        if(!this.delMinusTotal[0].isProfit){
            this.totalMinus = this.totalMinus + (+('-' + this.delMinusTotal[0].label.replace(/\D/g, "")/100))  
            localStorage.setItem('minus',JSON.stringify(this.totalMinus))
        }
        this.setState(({data})=>{
            let removeFetch = null
            const newArr = data.filter((obj) =>{
                    if (obj.id === id){
                        removeFetch = obj.id_name
                    }
                 return obj.id !== id
            } )
            this.fetches.removeSum(removeFetch).then(e => console.log(e))
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
        const a = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
        const newItem = {
            label: labelValidate,
            isProfit: this.state.isProfitBolean,
            status: statusValidate ,
            id: uuidv4(),
            date: new Date().toLocaleDateString('ru',a),
            login: this.state.login,
            email: localStorage.getItem('email'),
            id_name: ''
        }
        
        this.fetches.fetchPostSum(newItem).then((e)=>{
            return this.setState(({data})=>{
                const newArr = [...data, newItem]
                
                return {
                    data: newArr,
                    id_name: e.name
                     }
            })       
        })
    }

    minusTotalMoney(sumItem){
        this.minusItems.push(+sumItem)
        this.totalMinus = this.minusItems.reduce((sum, i) =>{
            return sum + i
        })
        localStorage.removeItem('minus')
        localStorage.setItem('minus',this.totalMinus)
    }
    plusTotalMoney(sumItem){
        this.sumItems.push(+sumItem)
        this.totalSum = this.sumItems.reduce((sum, i) =>{
            return sum + i
        })
        localStorage.removeItem('minus')
        localStorage.setItem('plus',this.totalSum)
    }
    dataFormInput(data){
        const formFetch = {
            login: data.name,
            email: data.email,
            isAuth: true,
        }
        console.log(formFetch)
        this.fetches.fetchPostEmail({...formFetch}).then((e)=>{
            localStorage.setItem('login',data.name)
            localStorage.setItem('email',data.email)
            return this.setState({
                login: data.name,
                email: data.email,
                isAuth: true,
                id_name: e.name            
            })
        })
        
    }
    render(){
        const moneyList = <MoneyList onDelete={this.onDelete} data={this.state.data}/>
        const isLoaded = this.state.data.length===0 ? <ShowFirst/> : moneyList
        const helper = 
                    <>
                        <AppHeader login={this.state.login} totalSum={this.totalSum} totalMinus={this.totalMinus}/>
                        <ChoiceBtns isProfitBolean={this.state.isProfitBolean} changeInputValue={this.changeInputValue}/>
                        <AddMoney onAdd={this.addItem} isProfit={this.state.isProfit}/>
                        { this.state.isLoad ?  isLoaded  : <div className='spinner_list'><Spinner/></div> }
                        
                    </>  
            return (
                <div className='app'>
                    { JSON.parse((localStorage.getItem('isAuth'))) ?  helper  :  <AuthForm dataFormInput={this.dataFormInput}/>}
                </div>
            )    
    }
}


