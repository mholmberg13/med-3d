import React from 'react';


class NewUser extends React.Component {

    state = {
        username: ''
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.props.baseURL)
        fetch(this.props.baseURL + '/users', {
            method: 'POST',
            body: JSON.stringify({username: this.state.username}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then (res => res.json())
        .then (resJson => {
            this.props.handleAddUser(resJson)
            this.setState({
                username: ''
            })
        }).catch (error => console.log({'Error' : error}))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='username'></label>
                    <input type='text' id="username" name="username" onChange={this.handleChange} value={this.state.username} placeholder="Username"/>
                    <input type="submit" value="Create User"/>
                </form>
            </div>
        )
    }
}

export default NewUser