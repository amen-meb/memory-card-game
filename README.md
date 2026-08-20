# Memory Card Game

A responsive Pokemon memory card game built with React for the **Nexus Front-End Boot Camp Project 4: State, Side Effects & Game Logic**.

This project applies `useState` and `useEffect` to manage asynchronous data fetching, score tracking, difficulty changes, win and loss states, and card shuffling.

## Live Demo

[Play the deployed game](https://memory-card-game-henna-eight.vercel.app/)

## Project Brief

The objective is to click every card exactly once. Cards are shuffled after each successful click, so the player must remember which Pokemon have already been selected rather than relying on their position in the grid.

## How to Play

1. Choose a difficulty level.
2. Click a Pokemon card to score one point.
3. The cards shuffle after every successful click.
4. Do not click a Pokemon that you have already selected during the current round.
5. Click every card once to win.
6. Clicking a previously selected card ends the round.

## Features

- Pokemon cards fetched from [PokeAPI](https://pokeapi.co/).
- Loading spinner while the initial API request is in progress.
- Retry action when the API request fails.
- Responsive card grid for desktop, tablet, and mobile screens.
- Three difficulty levels: Easy (8 cards), Medium (12 cards), and Hard (20 cards).
- Cards shuffle after each new selection.
- Current score and best score tracking during the session.
- Win state after all cards in the selected deck are clicked once.
- Loss state when a previously selected card is clicked again.
- Restart action after a win or loss.
- Unique Pokemon IDs used as React keys instead of array indexes.
- Keyboard-accessible card buttons and visible focus styles.


## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)
![Status](https://img.shields.io/badge/status-deployed-brightgreen)

### Installation

```bash
git clone <your-repository-url>
cd memory-card-game
npm install
```



