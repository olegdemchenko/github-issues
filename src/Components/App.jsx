import { useState } from 'react';

import Header from './Header';
import AppContainer from './AppContainer';
import SignIn from './SignIn';

function App() {
  const [isSignedIn, setSignedIn] = useState(false);
  const signIn = () => setSignedIn(true);
  const signOut = () => setSignedIn(false);

  return (
    <AppContainer>
      <Header isSignedIn signOut={signOut}/>
      <SignIn signIn={signIn} />
    </AppContainer>
  );
}

export default App;
