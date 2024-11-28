import React, { useState, useEffect } from 'react';
import CategoriesBar from "../../commons/CategoriesBar/CategoriesBar";
import SearchBar from "../../commons/searchBar";
import Card from "../../commons/Card";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const Home = () => {

  const apiKey = import.meta.env.VITE_API_KEY;
  const [videogamesList, setVideogamesList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const renderCards = () => {
    return videogamesList.map((game, i) => <Card data={game} key={uuidv4()} />)
  }

  // FETCH INICIAL
  useEffect(() => {
    const getVideogames = async () => {
      setLoading(true);
      try {
        const resp = await axios.get(`https://api.rawg.io/api/games?page=${page}&key=${apiKey}`);
        setVideogamesList(resp.data.results);
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    }
    getVideogames();
  }, [page]);

  const count = 43871;

  return <section id="home">
    <CategoriesBar />
    <div id="contentHome">
      <SearchBar />
      <section id="contentCards">
        { loading ? <HashLoader color="#fff"/> : renderCards() }
      </section>
      <section id="pagination">
        <Stack spacing={2}>
          <Pagination
            count={count}
            shape="rounded"
            page={page}
            onChange={(event, value) => setPage(value)}
            sx={{ // Estilos para el componente de MUI
              '& .MuiPaginationItem-root': {
                color: 'rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.10)',
                  padding: 'inherit',
                },
              },
              '& .Mui-selected': {
                backgroundColor: 'rgba(255, 255, 255, 0.179)',
                color: '#fff',
              },
            }}
          />
        </Stack>
      </section>
    </div>
  </section>;
};

export default Home;
