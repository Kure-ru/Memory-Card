import { useState, useEffect } from "react"
import TaskBar from "./TaskBar"
import ScoreBoard from "./ScoreBoard"
import useSound from 'use-sound';
import clickSound from '/assets/sounds/pickUpItem.mp3'

const Cards = () => {
    const CHARACTERS: string[] = ["Abigail", "Alex", "Elliott", "Emily", "Haley", "Harvey", "Leah", "Maru", "Penny", "Sam", "Sebastian", "Shane"]
    const [characterList, setCharacterList] = useState<string[]>([])
    const [displayedChars, setDisplayedChars] = useState<string[]>([])
    const [gameStarted, setGameStarted] = useState<boolean>(false)
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [gameWon, setGameWon] = useState<boolean>(false)
    const [soundOn, setSoundOn] = useState<boolean>(true)
    const [bestScore, setBestScore] = useState<number>(0)
    const [play] = useSound(clickSound)

    useEffect(() => {
        //generate array of characters 
        setCharacterList(CHARACTERS)
    }, [])

    const handleSelectCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (soundOn){play()}
        checkIfCorrect(e.currentTarget.getAttribute("data-value") as string)
    }

    const handleStartGame = () => {
        if (soundOn){play()}
        resetGame()
        setDisplayedChars(pickRandomValues());
    }

    const handleWin = () => {
        updateBestScore()
        setGameWon(true)
    }

    const updateBestScore = () => {
        12 - characterList.length > bestScore ? setBestScore(12 - characterList.length) : ''
    }

    const resetGame = () => {
        setCharacterList(CHARACTERS)
        setGameOver(false)
        setGameWon(false)
        setGameStarted(true)
    }
    // display 4 random cards
    // Fisher-Yates shuffle algorithm
    const pickRandomValues = (): string[] => {
        const shuffledList = [...CHARACTERS]
        for (let i = shuffledList.length - 1; i > 0; i--) {
            const j: number = Math.floor(Math.random() * (i + 1));
            [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]]
        }
        //pick only 4 characters
        const list = shuffledList.slice(0, 4)
        //check if displayed cards contain correct cards
        if (list.some(character => characterList.includes(character))) {
            return list
        }
        else {
            return pickRandomValues()
        }
    }

    const checkIfCorrect = (char: string) => {
        //check if card is still in array
        if (characterList.includes(char)) {
            //if last character, win
            if (characterList.length === 1) {
                handleWin()
            }
            //update list of characters
            setCharacterList(prevList => prevList.filter(item => item != char))
            //rerender 
            setDisplayedChars(pickRandomValues());
        }
        else {
            //if character was already picked, game over
            setGameOver(true)
            updateBestScore()
        }
    }

    console.log(soundOn)
    return (
        <>
        <ScoreBoard score={12 - characterList.length} bestScore={bestScore}/>
            <main>
                {displayedChars.map((char, index) => (
                    <div onClick={handleSelectCard} key={index} data-value={char} className='card'>
                        <p>{char}</p>
                        <div>
                            <img alt={char} src={`/assets/characters/${char}.png`} />
                        </div>
                    </div>
                ))}

            </main>
            {!gameStarted &&
                <div className="gamestart__container">
                    <button className="gamestart__button" onClick={handleStartGame}>Start playing</button>
                </div>}
            {gameOver &&
                <div>
                    <img onClick={handleStartGame} className="message" src="/assets/lose.png" />
                </div>}
            {gameWon &&
                <div>
                    <img onClick={handleStartGame} className="message" src="/assets/win.png" />
                </div>}
           
                <TaskBar charNum={12 - characterList.length} soundOn={soundOn} setSoundOn={setSoundOn} />

        </>
    )
}

export default Cards