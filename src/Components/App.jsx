import { useState } from 'react';

import Header from './Header';
import AppContainer from './AppContainer';


function App() {
  const [isSignedIn, setSignedIn] = useState(false);
  const signIn = () => setSignedIn(true);
  const signOut = () => setSignedIn(false);

  return (
    <AppContainer>
      <Header isSignedIn signOut={signOut}/>
    </AppContainer>
  );
}

export default App;
