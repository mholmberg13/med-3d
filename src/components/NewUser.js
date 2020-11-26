import React from 'react';


class NewUser extends React.Component {

    state = {
        username: '',
        email: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.props.baseURL)
        fetch(this.props.baseURL + '/users', {
            method: 'POST',
            body: JSON.stringify({username: this.state.username, email: this.state.email, password: this.state.password}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then (res => res.json())
        .then (resJson => {
            this.props.handleAddUser(resJson)
            this.setState({
                username: '',
                email: '',
                password: ''
            })
        }).catch (error => console.log({'Error' : error}))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='username'></label>
                    <input type='text' id="username" name="username" onChange={this.handleChange} value={this.state.username} placeholder="Username"/>
                    <label htmlFor='email'></label>
                    <input type='text' id="email" name="email" onChange={this.handleChange} value={this.state.email} placeholder="Email"/>
                    <label htmlFor='password'></label>
                    <input type='text' id="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Password"/>
                    <input type='text' id="confirm" name="confirm" onChange={this.handleChange} value={this.state.password} placeholder="Confirm Password"/>
                    <input type="submit" value="Create User"/>
                </form>
            </div>
        )
    }
}

export default NewUser