import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../components/context/UserContext'
import Axios from 'axios';
import ErrorNotice from './misc/ErrorNotice';

export default function Login()  {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();
    
    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = {email, password};
            const loginRes = await Axios.post('http://localhost:3004/users/login', loginUser);

            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });

            localStorage.setItem('auth-token', loginRes.data.token);

            history.push("/");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }

    };

    return(
        <div>
            { error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)}/>
            )}
            <form onSubmit={submit}>
                <label htmlFor='login-email'>Email</label>
                <input type='email' id="login-email" onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                <label htmlFor='login-password'>Password</label>
                <input type='password' id="login-password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>

                <input type='submit' value='Log In'/>
            </form>
        </div>
    )
}