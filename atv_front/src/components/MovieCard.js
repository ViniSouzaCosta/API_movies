import styles from './MovieCard.module.css';

export default function MovieCard({ title, year, rating, synopses, director, genre }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title} ({year})</h2> 
      
      <p className={styles.rating}> Rating: {rating}</p>
      
      <div className={styles.details}>
        <p><strong>Director:</strong> {director}</p>
        <p><strong>Genre:</strong> {genre}</p>
      </div>

      <p className={styles.synopses}>
        <strong>Synopses:</strong> {synopses} 
      </p>

    </div>
  );
}