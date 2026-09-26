import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { getAvatarById } from '../components/AvatarSelection/avatars';
import { STORAGE_KEYS, readJSON, writeJSON } from '../utils/storage';

const UserContext = createContext(null);

// Ignores anything that is not a { avatarId, username } object (e.g. data from older versions).
const getStoredAccount = () => {
  const account = readJSON(STORAGE_KEYS.userAccount, null);
  return account && account.avatarId && typeof account.username === 'string' ? account : null;
};

export const UserProvider = ({ children }) => {
  const [userAccount, setUserAccount] = useState(getStoredAccount);

  const updateUserAccount = useCallback((account) => {
    writeJSON(STORAGE_KEYS.userAccount, account);
    setUserAccount(account);
  }, []);

  const value = useMemo(
    () => ({
      userAccount,
      userName: userAccount?.username ?? '',
      userAvatar: getAvatarById(userAccount?.avatarId)?.AvatarImage,
      updateUserAccount,
    }),
    [userAccount, updateUserAccount]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used inside <UserProvider>');
  return context;
};
