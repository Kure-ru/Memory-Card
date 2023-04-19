type ScoreBoardProps = {
    score: number;
    bestScore: number;
}

const ScoreBoard = ({ score, bestScore }: ScoreBoardProps) => {
  return (
    
    <div className='score__board'>
      <p>Score: {score}</p>
      <p>Best score: {bestScore}</p>
    </div>
  )
}

export default ScoreBoard