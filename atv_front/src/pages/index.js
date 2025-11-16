import Head from "next/head"; 
import Layout from '@/components/Layout';              
import MovieListContent from '@/components/MovieListContent'; 
import Footer from '@/components/Footer';             

export default function Home() {
  return (
<>
   <Head>
    <title>Movie List &copy; 2025</title>
    <meta
     name="description"
     content="Consumo em React de uma API de Filmes"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
   </Head>
   
   <main>
    <Layout>
     <MovieListContent /> 
    </Layout>
   </main>
   
   <Footer />
  </>
 );
}