export default function GameOver({ won, onRestart }) {
  return (
    <div className="game-over">
      <h2>
        {won ? "You Win!" : "Game Over!"}
      </h2>

      <p>
        {won
          ? "Congratulations!"
          : "You clicked the same card twice."}
      </p>

      <button onClick={onRestart}>
        Play Again
      </button>
    </div>
  );
}

