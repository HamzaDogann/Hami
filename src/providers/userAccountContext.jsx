//React Hooks
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userAccount, setUserAccount] = useState({
    avatarId: null,
    username: '',
  });

  useEffect(() => {
    const userAccount = JSON.parse(localStorage.getItem("userAccount"));
    if (userAccount) {
      setUserAccount(userAccount);
    }
  }, [])

  const updateUserAccount = (newUserAccount) => {
    setUserAccount(newUserAccount);
  };

  return (
    <UserContext.Provider value={{ userAccount, updateUserAccount }}>
      {children}
    </UserContext.Provider>
  );
};
