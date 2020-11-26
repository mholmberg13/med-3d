import React from 'react';


class Login extends React.Component {

    state = {
        email: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value})
    }

    render() {
        return(
            <div>
                <form>
                <label htmlFor='email'></label>
                    <input type='text' id="email" name="email" onChange={this.handleChange} value={this.state.email} placeholder="Email"/>
                    <label htmlFor='password'></label>
                    <input type='text' id="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Password"/>
                </form>
            </div>
        )
    }
}

export default Login;