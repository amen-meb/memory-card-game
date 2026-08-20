import { useEffect, useState } from "react";

import Header from "./components/Header";
import Score from "./components/Score";
import CardGrid from "./components/CardGrid";
import GameOver from "./components/GameOver";

import "./App.css";
import DifficultySelector from "./components/DifficultySelector";

// GET RANDOM CARDS
function getRandomCards(cards, numberOfCards) {
  const shuffledCards = [...cards].sort(
    () => Math.random() - 0.5
  );
  return shuffledCards.slice(0, numberOfCards);
}

function App() {

  const [page, setPage] = useState("home");
  const [showRules, setShowRules] = useState(false);
  // All Pokémon fetched from the API
  const [allCards, setAllCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [won, setWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState("easy");

  const difficultySettings = {
    easy: 8,
    medium: 12,
    hard: 20,
  };

  const numberOfCards =
    difficultySettings[difficulty];

    // FETCH POKÉMON
  useEffect(() => {
    async function fetchPokemon() {
      try {
        const pokemonIds = getRandomIds(12); //12 random IDs 1-898
        const requests = pokemonIds.map((id) =>
          fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          ).then((response) => {

            if (!response.ok) {
              throw new Error(
                `HTTP error! status: ${response.status}`
              );
            }
            return response.json();
          })
        );
        const data = await Promise.all(requests);
        const formattedCards = data.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default,
        }));
        setAllCards(formattedCards);

        setCards(
          getRandomCards(
            formattedCards,
            numberOfCards
          )
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
   }
    fetchPokemon();
  }, []);

  // CHANGE DIFFICULTY
  useEffect(() => {
    if (allCards.length === 0) {
      return;
    }
    setCards(
      getRandomCards(
        allCards,
        numberOfCards
      )
    );
    setScore(0);
    setClickedCards([]);
    setGameOver(false);
    setWon(false);
  }, [difficulty, allCards]);

  function getRandomIds(count) {
    const ids = new Set();
    while (ids.size < count) {
      const randomId = Math.floor(Math.random() * 898) + 1;
      ids.add(randomId);
    }
    return Array.from(ids);
  }

  // START GAME
  function startGame() {
    setScore(0);
    setClickedCards([]);
    setGameOver(false);
    setWon(false);

    setCards(
      getRandomCards(
        allCards,
        numberOfCards
      )
    );
    setPage("game");
  }

  // SHUFFLE CARDS
  function shuffleCards() {
    setCards(
      getRandomCards( allCards, numberOfCards)
    );
  }

  // CARD CLICK
  function handleCardClick(card) {
    if (clickedCards.includes(card.id)) {
      setGameOver(true);
      return;
    }
    const newScore = score + 1;
    setScore(newScore);
    setClickedCards([...clickedCards, card.id]);

    if (newScore > bestScore) {
      setBestScore(newScore);
    }

    if (newScore === numberOfCards) {
      setWon(true);
      setGameOver(true);
      return;
    }
    shuffleCards();
  }

  function resetGame() {
    setCards( getRandomCards( allCards, numberOfCards )
    );
    setScore(0);
    setClickedCards([]);
    setGameOver(false);
    setWon(false);
  }

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Something went wrong!</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="game">
      <Header />
      <div className="game-top">
        <DifficultySelector/>
      </div>

      <Score
        score={score}
        bestScore={bestScore}
      />

      {!gameOver && (
        <CardGrid
          cards={cards}
          onCardClick={handleCardClick}
        />
      )}

      {gameOver && (
        <GameOver
          won={won}
          onRestart={resetGame}
        />
      )}
    </div>
  );
}


export default App;