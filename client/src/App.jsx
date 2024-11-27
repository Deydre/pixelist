import { useState } from 'react'
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter >
        <Header />
        <Main />
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
