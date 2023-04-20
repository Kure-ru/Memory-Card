import volumeIcon from '/assets/volume.svg'
import { useState } from 'react'

type Props ={
  charNum:number,
  soundOn: boolean,
  setSoundOn: any,
}

const TaskBar = ({ charNum, soundOn, setSoundOn }: Props) => {
  const [help, setHelp] = useState<boolean>(false)
  console.log(soundOn)
  const handleClick = () => {
   soundOn ? setSoundOn(false) : setSoundOn(true)

  }

const handleHelp = () => {
  setHelp(true)
}

  return (
    <footer>
            {help &&
                <div>
                    <img onClick={() => setHelp(false)} className="message" src="/assets/guide.png" />
                </div>}
      <button onClick={handleHelp}className='icon'>?</button>
      <p>{charNum}/12</p>
      <img className='icon' alt='volume icon' onClick={handleClick}src={volumeIcon}/>
      </footer>
  )
}

export default TaskBar