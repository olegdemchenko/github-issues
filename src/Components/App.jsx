import { useState } from "react";

import Header from "./Header";
import AppContainer from "./AppContainer";
import SignIn from "./SignIn";
import Issues from "./Issues";

function App() {
  const [isSignedIn, setSignedIn] = useState(false);
  const signIn = () => setSignedIn(true);
  const signOut = () => setSignedIn(false);

  const [issues, setIssues] = useState([]);
  const [userData, setUserData] = useState({});

  return (
    <AppContainer>
      <Header isSignedIn={isSignedIn} signOut={signOut} />
      {isSignedIn ? (
        <Issues issues={issues} userData={userData}/>
      ) : (
        <SignIn signIn={signIn} setIssues={setIssues} setUserData={setUserData}/>
      )}
    </AppContainer>
  );
}

export default App;
