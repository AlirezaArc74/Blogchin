import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [data, setData] = useState("")

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        data, 
        setData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const AllState = () => {
    const ctx =  useContext(UserContext);
    if (!ctx) throw new Error("AllState called out of range")
    return ctx
};

export { UserContextProvider, AllState };
