import React, { useState, useEffect } from 'react';
import NewUser from './components/NewUser.js'
import './App.css';
import UserContext from './components/context/UserContext'
import Axios from 'axios'

const baseURL = 'http://localhost:3004'



export default function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem('auth-token', "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:3004/users/tokenIsValid",
        null,
        {headers: { "x-auth-token": token}}
      )
      console.log(tokenRes.data)
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: {"x-auth-token": token}
        })
        setUserData({
          token,
          user: userRes.data
        })
      }
    }
    checkLoggedIn()
  }, [])

  // handleAddUser = (user) => {
  //   const copyUsers = [...this.state.users]
  //   copyUsers.unshift(user)
  //   this.setState({
  //     users: copyUsers
  //   })
  // }

    return (
      <div className="App">
        <UserContext.Provider value={{ userData, setUserData }}>
        <NewUser baseURL={baseURL}/>
        </UserContext.Provider>
      </div>
    );

}



