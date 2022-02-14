import Header from './Header';
import AppContainer from './AppContainer';
import AuthProvider from './AuthProvider';

function App() {

  return (
    <AuthProvider>
      <AppContainer>
        <Header />
      </AppContainer>
    </AuthProvider>
  );
}

export default App;
