import styles from './MovieCard.module.css';
import Image from 'next/image';

export default function MovieCard({ title, year, rating, synopses, director, genre }) {

  const placeholderSrc = '/images/capa_filme.png'; 

  return (
    <div className={styles.card}>
      
      {}
      <div className={styles.imageContainer}>
          <Image 
              src={placeholderSrc} 
              alt={`Capa de ${title}`} 
              width={150} 
              height={225}
              className={styles.movieCover}
          />
      </div>

      {}
      <div className={styles.detailsWrapper}>
          <h2 className={styles.title}>{title} ({year})</h2> 
          <p className={styles.rating}>Rating: {rating}</p>
          
          <div className={styles.details}>
            <p><strong>Director:</strong> {director}</p>
            <p><strong>Genre:</strong> {genre}</p>
          </div>

          <p className={styles.synopses}>
            <strong>Synopses:</strong> {synopses} 
          </p>

          {}
      </div>
    </div>
  );
}