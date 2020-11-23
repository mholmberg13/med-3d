import React from 'react';
import NewUser from './components/NewUser.js'
import './App.css';

const baseURL = 'http://localhost:3004'

class App extends React.Component {
  
  state = {
    users: []
  }

  getUsers = () => {
    fetch(baseURL+ '/users')
      .then(data => {
        return data.json()},
        err => console.log(err))
      .then(parsedData => console.log(parsedData),
       err=> console.log(err))
  }

  handleAddUser = (user) => {
    const copyUsers = [...this.state.users]
    copyUsers.unshift(user)
    this.setState({
      users: copyUsers
    })
  }

  render() {
    return (
      <div className="App">
        
        <NewUser
          baseURL={baseURL}
          handleAddUser={this.handleAddUser}
        />
        
      </div>
    );
  }
  componentDidMount = () => {
    this.getUsers();
  }
}

export default App;
