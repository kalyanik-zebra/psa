import React, { createContext, useState } from 'react';

export const UserLocationContext = createContext();


export const UserLocationProvider = ({ children }) =>{
    const [Location, setLocation] = useState(null);

    return(
        <UserLocationContext.Provider value={{ Location, setLocation }}>
            {children}
        </UserLocationContext.Provider>
    )
}