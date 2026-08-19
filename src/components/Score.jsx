export default function Score({score, bestScore}) {
    return (
        <div className="score">
            <p>Score: {score}</p>
            <p>Best Score: {bestScore}</p>
        </div>
    )
}