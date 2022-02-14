import { useState } from 'react';

import { AuthContext } from '../contexts';

const AuthProvider = ({ children }) => {
  const [isSignedIn, setSignedIn] = useState(false);
  const signIn = () => setSignedIn(true);
  const signOut = () => setSignedIn(false);
  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        signIn, 
        signOut,
    }}>{children}
    </AuthContext.Provider>);
};

export default AuthProvider;