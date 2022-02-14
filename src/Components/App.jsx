import { useState } from 'react';

import Header from './Header';
import AppContainer from './AppContainer';
import SignIn from './SignIn';
import Issues from './Issues';

function App() {
  const [isSignedIn, setSignedIn] = useState(false);
  const signIn = () => setSignedIn(true);
  const signOut = () => setSignedIn(false);

  return (
    <AppContainer>
      <Header isSignedIn={isSignedIn} signOut={signOut}/>
      {isSignedIn ? <Issues/> : <SignIn signIn={signIn} />}
    </AppContainer>
  );
}

export default App;
