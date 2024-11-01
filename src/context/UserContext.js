import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isGuest, setIsGuest] = useState(false);

    const loginAsGuest = () => setIsGuest(true);
    const loginUser = () => setIsGuest(false);

    return (
        <UserContext.Provider value={{ isGuest, loginAsGuest, loginUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
