import React, { Component } from 'react';
import './addMoney.css'

export default class AddMoney extends Component{
    constructor(props){
        super(props);
        this.state={
            text: '',
            classNames: "add-item_input",
            status: 'test'
            
        }
        this.onValueChange = this.onValueChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }
    onValueChange(e){
        this.setState({ text: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault()
        if (this.state.text==='' || this.state.text===undefined){ //проверям на валидацию инпут
            const newText = this.text
            const errorValidate = "add-item_input error_validate"
            this.setState({text: newText, classNames: errorValidate})
        } else{
            const successValidate = "add-item_input"
            const newText = this.text
            this.setState({text: newText,classNames: successValidate})
            this.props.onAdd(this.state.text)//отправляем данные в app
            this.setState({text: '',classNames: successValidate}) //очищаем форму
        }
        
    }
    render(){
        const {isProfit} = this.props
        return(
            <form onSubmit={this.handleSubmit} className="add-item">
                <input value={this.state.text === undefined ? '' : this.state.text }  onChange={this.onValueChange} className={this.state.classNames} type='text' placeholder={isProfit}/>
                <button type='submit'>Добавить</button>
            </form>
        )
    }
}
    

