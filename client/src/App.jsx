import { useState } from 'react'
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { context } from './context/context'
import { BrowserRouter } from 'react-router-dom';

function App() {

  const [userData, setUserData] = useState({
    email: "",

  });

  const updateUserData = (userLogged) => {
    setUserData([userLogged])
  };

  return (
    <>
      <BrowserRouter >
        <Header />
        <context.Provider value={{ userData, updateUserData }}>
          <Main />
        </context.Provider >
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
