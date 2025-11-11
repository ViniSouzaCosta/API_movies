// Importando useState
import { useState, useEffect } from "react";
// O hook useEffect é executado toda vez que o componente é re-renderizado (efeito colateral)

import styles from "@/components/HomeContent/HomeContent.module.css";
import Loading from "../Loading";
// Importando o AXIOS (para enviar as requisições HTTP)
import axios from "axios";
import EditContent from "../EditContent";

const HomeContent = () => {
  // Criando um estado para a lista de jogos
  const [games, setGames] = useState([]);
  // Criando o estado para controlar o carregamento da página
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null)

  // Criando o bloco do useEffect:
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:4000/games");
        // Atualizando o estado com a lista de jogos
        setGames(response.data.games);
        // console.log(response.data.games);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => setLoading(false), 3000);
      }
    };
    fetchGames();
  }, [games]); //dependência do useEffect

  // Função de DELETAR
  const deleteGame = async (gameId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/games/${gameId}`
      );
      if (response.status === 204) {
        alert("O jogo foi excluido com sucesso!");
        // Filtrando a lista de jogos removendo o jogo que foi excluído através de sua ID
        setGames(games.filter((game) => game._id !== gameId));
      }
    } catch (error) {
      console.log(error);
    }
  };
 // FUNÇÃO PARA ABRIR O MODAL
 const openEditModal = (game) =>{
  setSelectedGame(game);
 };

//  FUNÇÃO PARA FECHAR O MODAL
const closeEditModal = () =>{
  setSelectedGame(null)
}

  return (
    <>
      <div className={styles.homeContent}>
        {/* CARD LISTA DE JOGOS */}
        <div className={styles.listGamesCard}>
          {/* TITLE */}
          <div className={styles.title}>
            <h2>Lista de jogos</h2>
          </div>
          {loading ? (
            <Loading loading={loading} />
          ) : (
            <div className={styles.games} id={styles.games}>
              {/* Lista de jogos irá aqui */}
              {games.map((game) => (
                <ul key={game._id} className={styles.listGames}>
                  <div className={styles.gameImg}>
                    <img src="images/game_cd_cover.png" alt="jogo em estoque" />
                  </div>
                  <div className={styles.gameInfo}>
                    <h3>{game.title}</h3>
                    <li>Plataforma: {game.descriptions.platform}</li>
                    <li>Gênero: {game.descriptions.genre}</li>
                    <li>Classificação: {game.descriptions.rating}</li>
                    <li>Ano: {game.year}</li>
                    <li>
                      Preço:
                      {game.price.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </li>
                    {/* Botão para DELETAR */}
                    <button
                      className={styles.btnDel}
                      onClick={() => {
                        const confirmed = window.confirm(
                          "Deseja mesmo excluir o jogo?"
                        );
                        if (confirmed) {
                          deleteGame(game._id);
                        }
                      }}
                    >
                      Deletar
                    </button>

                      {/* {Botão para EDITAR} */}
                      <button className={styles.btnEdit} onClick={() => openEditModal(game)}> 
                        Editar
                      </button>
                  </div>
                </ul>
              ))}
            </div>
          )}
        </div>
        {/* {Renderização condicional para fazer aparecer o MODAL} */}
        {selectedGame && (
          <EditContent game ={selectedGame} closeEditModal={closeEditModal}/>

        )}
      </div>
    </>
  );
};

export default HomeContent;
