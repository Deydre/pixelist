import { useState, useEffect } from 'react'
import Header from './components/Header';
import Main from './components/Main';
import { context } from './context/context'
import { BrowserRouter } from 'react-router-dom';
import axios from "axios";

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [favsUser, setFavsUser] = useState([]);

  const [profile, setProfile] = useState(null);

  // Para login y logout
  const updateProfile = (data) => {
    setProfile(data)
  };
  

  useEffect(() => {
    // Comprobamos el user mediante su token con la ruta habilitada para ello
    const getProfile = async () => {
      try {
        const response = await axios(`http://localhost:3000/api/user/me`, {
          withCredentials: true
        });
        setProfile(response.data[0])
        console.log(response)
      } catch (err) {
        console.log(err);
      }
    };
    getProfile();
  }, []);

  useEffect(() => {
    // Guardamos sus favoritos
    const getFavorites = async () => {
      try {
        if (profile.email) {
          let response = await axios(`http://localhost:3000/api/favorites/${profile.email}`);
          setFavsUser(response.data);
        }
      } catch (err) {
        console.log(err)
      }
    }
    getFavorites();
  }, []);

  useEffect(() => {
    // Guardamos sus favoritos
    const getFavorites = async () => {
      try {
        if (profile.email) {
          let response = await axios(`http://localhost:3000/api/favorites/${profile.email}`);
          setFavsUser(response.data);
        }
      } catch (err) {
        console.log(err)
      }
    }
    getFavorites();
  }, [profile]);


  const updateFavsUser = (fav) => {
    setFavsUser([fav])
  };
  
  // Contexto para categories porque lo van a usar los componentes CategoriesBar y Category
  const [categories, setCategories] = useState([])

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
        <context.Provider value={{
          categories, // Estado global donde siempre tendremos todas las categorías disponibles con sus juegos
          // actualCategory, updateActualCategory // Categoría actual en la que estamos
          // updateLogged,
          profile, updateProfile,
          favsUser, updateFavsUser
        }}>
          <Header />
          <Main />
        </context.Provider >
      </BrowserRouter>
    </>
  )
}

export default App
