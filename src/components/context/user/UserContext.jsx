import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ( {children} ) => {

    const url = 'https://vehicle-catalog-api.herokuapp.com';

    const register = async (user) => {
        const response = await fetch(`${url}/users/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        return data;
    }

    const authenticate = async (user) => {
        const response = await fetch(`${url}/users/auth`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
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