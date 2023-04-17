import { useState, useEffect, ReactEventHandler } from "react"

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

      const handleStartGame = () => {
        setGameOver(false)
        setGameStarted(true)
        setDisplayedChars(pickRandomValues());
    }

    const handleSelectCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        checkIfCorrect(e.currentTarget.getAttribute("value") as string)
    }

    // one round
    // display 4 random cards
    const pickRandomValues = ():string[] => {
        const randomValues: string[] = []
        while (randomValues.length < 4){
            const randomIndex = Math.floor(Math.random() * characterList.length)
            const randomChar = characterList[randomIndex]
            if (!randomValues.includes(randomChar)){
                randomValues.push(randomChar)
            }
        }
        return randomValues
    }
 
    const checkIfCorrect = (char:string) => {
        console.log(char)
        //check if card is still in array
        if (characterList.includes(char)){
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
    // if clicked card is new, repeat
    // else game over

    return (
        <>
        <button onClick={handleStartGame}>START</button>
        <main>
        {displayedChars.map((char, index)  =>   (
            <div onClick={handleSelectCard} key={index}  value={char} className='card'>
                <p>{char}</p>
                <div>
                <img src={`/assets/characters/${char}.png`}/>
                </div>
            </div>
        ))}
            
        </main>
        {gameOver && 
        <div>
            <img className="message" src="/assets/lose.png"/>
            <button onClick={handleStartGame}>Try again</button>
        </div>}
        </>
    )
}

export default Cards