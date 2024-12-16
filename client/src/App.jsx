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

  const [actualCategory, setActualCategory] = useState("");

  // Para login y logout
  const updateProfile = (data) => {
    setProfile(data)
  };

  // Para recargar favoritos
  const updateFavsUser = async () => {
    try {
      if (profile.email) {
        let response = await axios(`https://pixelist.onrender.com/api/favorites/${profile.email}`);
        setFavsUser(response.data);
      }
    } catch {
      console.log("Aún no se han cargado los favoritos del usuario")
    }
  };

  const updateActualCategory = (actualCategory) => {
    setActualCategory(actualCategory)
  };

  useEffect(() => {
    // Comprobamos el user mediante su token con la ruta habilitada para ello
    const getProfile = async () => {
      try {
        const response = await axios(`https://pixelist.onrender.com/api/user/me`, {
          withCredentials: true
        });
        console.log({response})
        setProfile(response.data[0])
      } catch {
        console.log("Aún no se ha cargado el user o no hay user")
      }
    };
    getProfile();
  }, []);

  useEffect(() => {
    // Guardamos sus favoritos
    const getFavorites = async () => {
      try {
        if (profile.email) {
          let response = await axios(`https://pixelist.onrender.com/api/favorites/${profile.email}`);
          setFavsUser(response.data);
        }
      } catch (err) {
        console.log("Aún no se han cargado los favoritos del usuario")
      }
    }
    getFavorites();
  }, []);

  useEffect(() => {
    // Guardamos sus favoritos
    const getFavorites = async () => {
      try {
        if (profile.email) {
          let response = await axios(`https://pixelist.onrender.com/api/favorites/${profile.email}`);
          setFavsUser(response.data);
        }
      } catch (err) {
        console.log("Aún no se han cargado los favoritos del usuario")
      }
    }
    getFavorites();
  }, [profile]);



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
          favsUser, updateFavsUser,
          updateActualCategory
        }}>
          <Header />
          <Main />
        </context.Provider >
      </BrowserRouter>
    </>
  )
}

export default App
