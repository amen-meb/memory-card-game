export default function DifficultySelector({ difficulty, onDifficultyChange }) {
  return (
    <div className="difficulty-selector">
      <span>Select Difficulty:</span>

      <button
        className={difficulty === "easy" ? "difficulty-button active" : "difficulty-button"}
        value="easy"
        onClick={() => onDifficultyChange("easy")}
      >
        <span className="diff-name">Easy</span>
        <span className="diff-count">(8 Cards)</span>

      </button>
      
      <button
        className={difficulty === "medium" ? "difficulty-button active" : "difficulty-button"}
        value="medium"
        onClick={() => onDifficultyChange("medium")}
      >
        <span className="diff-name">Medium</span>
        <span className="diff-count">(12 Cards)</span>
      </button>
      
      <button
        className={difficulty === "hard" ? "difficulty-button active" : "difficulty-button"}
        value="hard"
        onClick={() => onDifficultyChange("hard")}
      >
        <span className="diff-name">Hard</span>
        <span className="diff-count">(20 Cards)</span>
      </button>
    </div>
  );
}