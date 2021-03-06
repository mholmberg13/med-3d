import React, { useEffect, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from './context/UserContext';
import NewOrder from './NewOrder';

export default function Home() {
    
    const {userData} = useContext(UserContext);
    const history = useHistory();


    useEffect(() => {
        if (!userData.user) history.push('/login')
    });

    return(
        <div>
            <h1>Home</h1>
            <NewOrder/>
        </div>
    )
};
