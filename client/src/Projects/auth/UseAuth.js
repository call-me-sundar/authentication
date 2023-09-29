import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [verify, setVerify] = useState();

  useEffect(() => {
    console.log(verify);
  }, [verify]);

  return (
    <AuthContext.Provider value={{ verify, setVerify }}>
      {children}
    </AuthContext.Provider>
  );
}
