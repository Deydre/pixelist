import { useState, useEffect } from 'react'
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { context } from './context/context'
import { BrowserRouter } from 'react-router-dom';
import axios from "axios";

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [userData, setUserData] = useState({
    email: "",

  });

  const updateUserData = (userLogged) => {
    setUserData([userLogged])
  };

  // Contexto para categories porque lo van a usar los componentes CategoriesBar y Category
  const [categories, setCategories] = useState([])

  // const [actualCategory, setActualCategory] = useState("");

  // const updateActualCategory = (newCategory) => {
  //   setActualCategory([newCategory])
  // };

  // FETCH
  useEffect(() => {
    const getCategory = async () => {
      try {
        const resp = await axios.get(`https://api.rawg.io/api/genres?&key=${apiKey}`);

        // Almacenamos en un estado cada categoría y los slugs de los juegos a los que pertenece para enviarlo todo junto a los componentes CategoriesBar y Category y evitar una llamada a la API intermedia además de la de pintar los juegos
        const arrayCategories = resp.data.results.map(categoryData => ({
          name: categoryData.name,
          slug: categoryData.slug,
          games: categoryData.games.map(game => game.slug)
        }));

        // Actualizar el estado con el array completo de categorías
        setCategories(arrayCategories);

      } catch (err) {
        console.log(err)
      }
    }
    getCategory();
  }, []);

  return (
    <>
      <BrowserRouter >
        <Header />
        <context.Provider value={{ 
          userData, updateUserData, // Datos del usuario que simulan token
          categories, // Estado global donde siempre tendremos todas las categorías disponibles con sus juegos
          // actualCategory, updateActualCategory // Categoría actual en la que estamos
          }}>
          <Main />
        </context.Provider >
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
