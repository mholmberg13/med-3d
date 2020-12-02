import React, { useState, useEffect } from 'react';
import AuthOptions from './components/AuthOptions'
import Home from './components/Home';
import NewUser from './components/NewUser';
import Login from './components/Login';
import './App.css';
import UserContext from './components/context/UserContext';
import Axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
      
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:3004/users/", {
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

    return (
      <>
        <BrowserRouter>
          <UserContext.Provider value={{ userData, setUserData }}>
            <AuthOptions/>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={NewUser} />
            </Switch>
          </UserContext.Provider>
        </BrowserRouter>
      </>
      
    );

}



