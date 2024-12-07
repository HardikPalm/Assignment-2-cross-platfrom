import { useState, createContext, useRef, useEffect } from "react";

export const UserDataContext = createContext({});
const UserDataState = () => {
  const [user, setUser] = useState(null);
  const [apicall, setapicall] = useState(false);

  return {
    user,
    setUser,
    apicall,
    setapicall,
  };
};

const UserDataProvider = ({ children }: any) => {
  const store = { ...UserDataState() };

  return (
    <UserDataContext.Provider value={store}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
