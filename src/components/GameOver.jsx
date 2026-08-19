export default function GameOver({won, onRestart}) {
  return (
    <div className="game-over">
      <h2>{won ? "You Won!" : "Game Over!"}</h2>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
}   