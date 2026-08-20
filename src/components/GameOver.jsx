export default function GameOver({
  won,
  score,
  bestScore,
  onRestart,
}) {
  return (
    <div className="game-over-overlay">
      <div className="game-over">

        <h2>
          {won ? "You Win!" : "You Lose!"}
        </h2>

        <div className="game-over-scores">

          <p>
            Current Score: <span>{score}</span>
          </p>

          <p>
            Best Score: <span>{bestScore}</span>
          </p>

        </div>

        <button onClick={onRestart}>
          Play Again
        </button>

      </div>
    </div>
  );
}