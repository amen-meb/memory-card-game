export default function DifficultySelector({ difficulty, onDifficultyChange }) {
  
  return (
    <div className="difficulty-selector">
        <label htmlFor="difficulty">Select Difficulty:</label>

        <button
          className={difficulty === "easy" ? "difficulty-button active" : "difficulty-button"}
          value="easy"
          onClick={() => onDifficultyChange("easy")}
        >
          Easy
        </button>
        <button
          className={difficulty === "medium" ? "difficulty-button active" : "difficulty-button"}
          value="medium"
          onClick={() => onDifficultyChange("medium")}
        >
          Medium
        </button>
        <button
          className={difficulty === "hard" ? "difficulty-button active" : "difficulty-button"}
          value="hard"
          onClick={() => onDifficultyChange("hard")}
        >
          Hard
        </button>
      
    </div>
  );
}