// src/pages/index.js (FINAL com correção de erro)

import MovieCard from '../components/MovieCard';
import styles from '../styles/Home.module.css'; 

// 1. Função de busca de dados (Roda no servidor do Next.js)
export async function getServerSideProps() {
  const API_URL = 'http://localhost:4001/movies'; // Verifique se o endpoint é este

  try {
    const res = await fetch(API_URL);
    
    if (!res.ok) {
        throw new Error(`Error fetching data: Status ${res.status}`);
    }
    
    const data = await res.json(); 
    // Sua API retorna: { movies: [...] }, então pegamos o array 'movies'
    const movies = data.movies; 
    
    return {
      props: {
        movies: movies, 
        apiError: null, // Sem erro na busca
      },
    };
  } catch (error) {
    console.error('Failed to connect with API:', error);
    return {
      props: {
        movies: [], // Retorna um array vazio
        apiError: `Error fetching data: Check API server (localhost:4001). Details: ${error.message}` 
      },
    };
  }
}

// 2. Componente de Página
export default function Home({ movies, apiError }) {
  return (
    <div className={styles.container}>
      <h1>Movie List from API</h1>
      
      {apiError && <p style={{ color: 'red', fontWeight: 'bold' }}>{apiError}</p>}

      <div className={styles.movieGrid}>
        {/* CORREÇÃO DO ERRO: (movies && movies.length > 0) */}
        {movies && movies.length > 0 ? ( 
          movies.map((movie) => {
            
            // --- CÓDIGO CHAVE: ACESSANDO O ARRAY DESCRIPTIONS ---
            // Pega o primeiro objeto do array descriptions. 
            // É importante garantir que descriptions existe e tem pelo menos 1 item.
            const details = Array.isArray(movie.descriptions) && movie.descriptions.length > 0
              ? movie.descriptions[0]
              : {}; 
            // ---------------------------------------------------

            return (
              <MovieCard 
                key={movie._id || movie.title}
                title={movie.title}
                year={movie.year}
                rating={movie.rating}
                
                // Passando os campos aninhados
                synopses={details.synopses || 'N/A'}
                director={details.director || 'N/A'}
                genre={details.genre || 'N/A'}
              />
            );
          })
        ) : (
          // Exibe a mensagem de 'no movies' apenas se não houver um erro de API
          !apiError && <p>No movies found from the API. Check if the API is running and has data.</p>
        )}
      </div>
    </div>
  );
}