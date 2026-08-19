import { useEffect, useState } from "react";

import Header from "./components/Header";
import Score from "./components/Score";
import CardGrid from "./components/CardGrid";
import GameOver from "./components/GameOver";
import DifficultySelector from "./components/DifficultySelector";

import "./App.css";


// Get random cards
function getRandomCards(cards, numberOfCards) {
  const shuffledCards = [...cards].sort(
    () => Math.random() - 0.5
  );

  return shuffledCards.slice(0, numberOfCards);
}


function App() {

  // All Pokémon from the API
  const [allCards, setAllCards] = useState([]);

  // Cards currently displayed
  const [cards, setCards] = useState([]);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [clickedCards, setClickedCards] = useState([]);

  const [won, setWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [difficulty, setDifficulty] = useState("easy");


  // Difficulty settings
  const difficultySettings = {
    easy: 6,
    medium: 12,
    hard: 15,
  };

  const numberOfCards =
    difficultySettings[difficulty] || 6;


  // Fetch Pokémon
  useEffect(() => {

    async function fetchPokemon() {

      try {

        const pokemonIds = Array.from({ length: 12 }, () => crypto.randomUUID());


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
            difficultySettings[difficulty]
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


  // Change cards when difficulty changes
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

    // Reset game when difficulty changes
    setScore(0);
    setClickedCards([]);
    setGameOver(false);
    setWon(false);

  }, [difficulty, allCards]);


  // Shuffle cards
  function shuffleCards() {

    setCards(
      getRandomCards(
        allCards,
        numberOfCards
      )
    );

  }


  // Handle card click
  function handleCardClick(card) {

    // Already clicked?
    if (clickedCards.includes(card.id)) {

      setGameOver(true);

      return;
    }


    const newScore = score + 1;

    setScore(newScore);


    setClickedCards([
      ...clickedCards,
      card.id
    ]);


    // Update best score
    if (newScore > bestScore) {

      setBestScore(newScore);

    }


    // Player clicked all available Pokémon
    if (newScore === allCards.length) {

      setWon(true);

      setGameOver(true);

      return;
    }


    // Shuffle cards
    shuffleCards();
  }


  // Reset game
  function resetGame() {

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

  }


  // Loading
  if (loading) {

    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );

  }


  // Error
  if (error) {

    return (
      <div className="error">

        <h2>Something went wrong!</h2>

        <p>{error}</p>

      </div>
    );

  }


  return (
    <>

      <Header />


      <DifficultySelector
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
      />


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

    </>
  );
}


export default App;