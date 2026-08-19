import { useState } from 'react'
import Header from './components/header'
import Score from './components/Score'
import CardGrid from './components/CardGrid'
import GameOver from './components/GameOver'
import initialCards from './sampleData.js'

import './App.css'

function App() {
  const [cards, setCards] = useState(initialCards)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [won, setWon] = useState(false)
  const [clickedCards, setClickedCards] = useState([])
  const [gameOver, setGameOver] = useState(false)

  function shuffleCards() {
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
  }
  
  function handleCardClick(card) {
    if (clickedCards.includes(card.id)) {
      setGameOver(true);
      return;
    }
    const newScore = score + 1
    setScore(newScore)
    setClickedCards([...clickedCards, card.id])

    if (newScore > bestScore) {
      setBestScore(newScore)
    }

    if (newScore === cards.length) {
      setWon(true)
      setGameOver(true)
    } 
    shuffleCards()
  }

  function resetGame() {
    setCards([...initialCards])
    setScore(0)
    setClickedCards([])
    setGameOver(false)
    setWon(false)
  }

  return (
    <>
      <Header />
      <Score score={score} bestScore={bestScore} />
      <CardGrid cards={cards} onCardClick={handleCardClick} />
      
      {!gameOver && (<CardGrid cards={cards} onCardClick={handleCardClick} />)}
      {gameOver && (<GameOver won={won} onRestart={resetGame} />)}
    </>
  )
}

export default App
