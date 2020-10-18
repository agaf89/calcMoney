import React, { Component } from 'react'
import './authForm.css'

export default class AuthForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            isAuth: false
        }
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onSubmitForm = this.onSubmitForm.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
    }
    onSubmitForm(e){
        e.preventDefault()
        JSON.stringify(localStorage.setItem('isAuth', true));
        this.props.dataFormInput(this.state)
        
    }
    onChangeEmail(e){
        const email = e.target.value
        this.setState(()=>{
            return {
                email: email,
                isAuth: true
            }
        })
    }
    onChangeName(e){
        const name = e.target.value
        
        this.setState(()=>{
            return {
                name: name
            }
        })
    }

    render(){
        return(
            <form onSubmit={this.onSubmitForm} className='auth'>
                <label htmlFor='name'>Имя</label>
                <input
                required
                id='name'
                value={this.state.name}
                onChange={this.onChangeName}
                type='text'
                placeholder='Как Вас зовут?'
                className='auth_name'
                    />
                <label htmlFor='email'>Почта</label>

                <input
                required
                id='email'
                value={this.state.email}
                type='email'
                placeholder='Ваша почта'
                className='auth_email'
                onChange={this.onChangeEmail}
                    />
                <button className='auth_btn' type='submit'>Войти</button>
            </form>
        )
    }
}