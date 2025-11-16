import MovieCard from '../MovieCard';
import { useState, useEffect } from 'react'; 

export default function MovieListContent() {
    const [movies, setMovies] = useState([]);
    const [apiError, setApiError] = useState(null);
    const API_URL = 'http://localhost:4001/movies'; 

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(API_URL);
                if (!res.ok) {
                    throw new Error(`Error fetching data: Status ${res.status}`);
                }
                const data = await res.json(); 
                setMovies(data.movies || []); 
                setApiError(null);
            } catch (error) {
                console.error('erro na conexão com a api:', error);
                setMovies([]);
                setApiError(`erro ${error.message}`);
            }
        };
        fetchMovies();
    }, []); 

    return (
        <>
            {apiError && <p style={{ color: 'red', fontWeight: 'bold', zIndex: 2 }}>{apiError}</p>}
            {}
            {}
            {Array.isArray(movies) && movies.length > 0 ? ( 
                movies.map((movie) => {
                    const details = Array.isArray(movie.descriptions) && movie.descriptions.length > 0
                        ? movie.descriptions[0]
                        : {}; 
                    return (
                        <MovieCard 
                            key={movie._id || movie.title}
                            title={movie.title}
                            year={movie.year}
                            rating={movie.rating}
                            synopses={details.synopses || 'N/A'}
                            director={details.director || 'N/A'}
                            genre={details.genre || 'N/A'}
                        />
                    );
                })
            ) : (
                !apiError && <p style={{color: '#c0c0c0'}}>Nenhum filme encontrado.</p>
            )}
        </>
    );
}