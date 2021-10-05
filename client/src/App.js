import logo from './logo.svg';
import './App.css';
import Pages from './components';
import UserInfoContext, { localContext, userAliasRefresh } from './context/userInfo.tsx';

function App() {
  return (
    <UserInfoContext.Provider value={{localContext, userAliasRefresh}}>
    <Pages />
    </UserInfoContext.Provider>
  );
}

export default App;
