import React, { createContext, useContext, useState } from 'react';

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [avatarUri, setAvatarUri] = useState(require('../assets/avatars/avatar1.png'));
  
  return (
    <AvatarContext.Provider value={{ avatarUri, setAvatarUri }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  return useContext(AvatarContext);
};
