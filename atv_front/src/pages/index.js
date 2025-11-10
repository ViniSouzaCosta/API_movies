import Head from 'next/head';
import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);


  const API_URL = 'http://localhost:3001/movies';

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <Head>
        <title>Lista de Filmes</title>
      </Head>

      <main style={{ maxWidth: 800, margin: '24px auto', padding: '0 16px' }}>
        <h1>🎬 Catálogo de Filmes</h1>

        {error ? (
          <p style={{ color: 'red' }}>Erro ao carregar filmes: {error}</p>
        ) : movies.length > 0 ? (
          <MovieList movies={movies} />
        ) : (
          <p>Carregando filmes...</p>
        )}
      </main>
    </>
  );
}
