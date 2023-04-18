import { useState, useEffect } from "react"


const Cards = () => {

    const CHARACTERS: string[] = ["Abigail", "Alex", "Elliott", "Emily", "Haley", "Harvey", "Leah", "Maru", "Penny", "Sam", "Sebastian", "Shane"]
    const [characterList, setCharacterList] = useState<string[]>([])
    const [displayedChars, setDisplayedChars] = useState<string[]>([])
    const [gameStarted, setGameStarted] = useState<boolean>(false)
    const [gameOver, setGameOver] = useState<boolean>(false)

    useEffect(() => {
        //generate array of characters 
        setCharacterList(CHARACTERS)
    }, [])

    const handleSelectCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        checkIfCorrect(e.currentTarget.getAttribute("data-value") as string)
    }

    const handleStartGame = () => {
        setGameOver(false)
        setGameStarted(true)
        setDisplayedChars(pickRandomValues());
    }
    // display 4 random cards
    // Fisher-Yates shuffle algorithm
    const pickRandomValues = (): string[] => {
        const shuffledList = [...CHARACTERS]
        for (let i = shuffledList.length - 1; i > 0; i--) {
            const j: number = Math.floor(Math.random() * (i + 1));
            [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]]
        }
        return shuffledList.slice(0, 8)
    }

    const checkIfCorrect = (char: string) => {
        console.log(char)
        //check if card is still in array
        if (characterList.includes(char)) {
            //update list of characters
            setCharacterList(prevList => prevList.filter(item => item != char))
            //rerender 
            setDisplayedChars(pickRandomValues());
        }
        else {
            //if character was already picked, game over
            setGameOver(true)
        }
        console.log(characterList)
    }
    return (
        <>
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
                <div>
                    <button onClick={handleStartGame}>Start playing</button>
                </div>}
            {gameOver &&
                <div>
                    <img className="message" src="/assets/lose.png" />
                    <button onClick={handleStartGame}>Try again</button>
                </div>}
        </>
    )
}

export default Cards