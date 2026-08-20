export default function Score({score, bestScore}) {
    return (
        <div className="score">
            <div>
                <span>Score:</span>
            </div>
            <p>{score}</p>
            <div>
                <span>Best Score:</span>
            </div>
            <p>{bestScore}</p>
        </div>
    )
}