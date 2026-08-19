import { useEffect, useState } from 'react'
import Header from './components/header'
import Score from './components/Score'
import CardGrid from './components/CardGrid'
import GameOver from './components/GameOver'

import './App.css'

// Get 6 random cards from the available Pokémon
function getRandomCards(cards) {
  const shuffledCards = [...cards].sort(() => Math.random() - 0.5)

  return shuffledCards.slice(0, 6)
}

function App() {
  const [allcards, setAllCards] = useState([]);
  const [cards, setCards] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [clickedCards, setClickedCards] = useState([])
  const [won, setWon] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Pokémon when the component loads
  useEffect(() => {
    async function fetchPokemon() {

      try {
        const pokemonIds = [1, 2, 3, 4, 5, 6];

        const requests = pokemonIds.map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json()
            })
        );

        // Wait for all API requests to complete
        const data = await Promise.all(requests);

        const formattedCards = data.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default,
        }));

        setAllCards(formattedCards);

        setCards(getRandomCards(formattedCards));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, []);

  // Shuffle the cards
  function shuffleCards() {
    setCards(getRandomCards(allcards))
  }

  function handleCardClick(card) {
    // Player clicked a card they already clicked
    if (clickedCards.includes(card.id)) {
      setGameOver(true)
      return
    }

    const newScore = score + 1

    setScore(newScore)

    setClickedCards([
      ...clickedCards,
      card.id
    ]);

    if (newScore > bestScore) {
      setBestScore(newScore)
    }

    // Player successfully clicked all 15 cards
    if (newScore === allcards.length) {
      setWon(true)
      setGameOver(true)
      return
    }

    shuffleCards()
  }

  function resetGame() {
    setCards(getRandomCards(allcards))
    setScore(0)
    setClickedCards([])
    setGameOver(false)
    setWon(false)
  }

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>);
  }

  if (error) {
    return (
      <div className="error">
        <h2>Something went wrong!</h2>

        <p>{error}</p>
      </div>);
  }



  return (
    <>
      <Header />

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
  )
}

export default App