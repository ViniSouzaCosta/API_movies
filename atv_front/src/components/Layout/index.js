import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>    
      {}
      <h1 className={styles.pageTitle}>Lista de Filmes</h1> 
      {}
      <div className={styles.contentWrapper}>
        {children}
      </div>
      
    </div>
  );
}