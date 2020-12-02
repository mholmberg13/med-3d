import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../components/context/UserContext'
import Axios from 'axios';


export default function NewUser() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();

    const {setUserData} = useContext(UserContext);

    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        const newUser = {email, password, passwordCheck, displayName};
        await Axios.post("http://localhost:3004/users/register", newUser);
        const loginRes = await Axios.post('http://localhost:3004/users/login', { 
            email, 
            password
        });

        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        });

        localStorage.setItem('auth-token', loginRes.data.token);

        history.push("/");

    }

        return (
            <div>
                <form onSubmit={submit}>
                    <label htmlFor='display-name'>User Name</label>
                    <input type='text' id="username" name="username" placeholder="Username" onChange={e => setDisplayName(e.target.value)}/>
                    
                    <label htmlFor='email'>Email</label>
                    <input type='email' id="email" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    
                    <label htmlFor='password'>Password</label>
                    <input type='text' id="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    
                    <input type='text' id="confirm" name="confirm" placeholder="Confirm Password" onChange={e => setPasswordCheck(e.target.value)}/>
                    <input type="submit" value="Create User"/>
                </form>
            </div>
        )
}
