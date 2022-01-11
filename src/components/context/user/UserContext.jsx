import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ( {children} ) => {

    const register = async (user) => {
        console.log(user);
        const response = await fetch('http://localhost:8080/users/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        console.log(data);
        return data;
    }

    const authenticate = async (user) => {
        console.log(user);
        const response = await fetch('http://localhost:8080/users/auth', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        console.log(data);
        return data;
    }

    return(
        <UserContext.Provider value={{
            register: register,
            authenticate: authenticate
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;