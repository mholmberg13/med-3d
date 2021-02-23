import React from 'react';
import Axios from 'axios';


class OrderForm extends React.Component {
    state = {
        email: "",
        qty: 0,
        street: "",
        city: "",
        state_region: "",
        country: ""
    }
    setInputs = (e) => {
        this.setState({
            email: e.target.value,
            qty: e.target.value,
            street: e.target.value,
            city: e.target.value,
            state_region: e.target.value,
            country: e.target.value,

        })
    }
    handleSubmit = () => {
        let newOrder = {email: this.state.email, qty: this.state.qty, street: this.state.street, city: this.state.city, state_region: this.state.state_region, country: this.state.country}
        Axios.post(newOrder)
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <label htmlFor='order-email'>Order Email</label>
                <input type='email' id="order-email" onChange={this.setInputs} placeholder="Email"/>
                <label htmlFor='order-qty'>Quantity</label>
                <input type='number' id="order-qty" onChange={this.setInputs} placeholder="0"/>
                <label htmlFor='order-street'>Street Address</label>
                <input type='text' id="order-street" onChange={this.setInputs} placeholder="Street Address"/>
                <label htmlFor='order-city'>City</label>
                <input type='text' id="order-city" onChange={this.setInputs} placeholder="City"/>
                <label htmlFor='order-region'>State/Region</label>
                <input type='text' id="order-region" onChange={this.setInputs} placeholder="State/Region"/>
                <label htmlFor='order-country'>Country</label>
                <input type='text' id="order-country" onChange={this.setInputs} placeholder="Country"/>

                <input type='submit' value='Submit Order'/>
            </form>
            </div>
        )
    }
}

export default OrderForm;