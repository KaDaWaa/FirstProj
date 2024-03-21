import { createContext, useContext, useState } from "react";

const usersContext = createContext();
const setUsersContext = createContext();

export function useUsersContext() {
  return useContext(usersContext);
}

export function useSetUsersContext() {
  return useContext(setUsersContext);
}

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  return (
    <usersContext.Provider value={users}>
      <setUsersContext.Provider value={setUsers}>
        {children}
      </setUsersContext.Provider>
    </usersContext.Provider>
  );
}
