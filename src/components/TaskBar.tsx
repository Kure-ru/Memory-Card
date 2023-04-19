import volumeIcon from '/assets/volume.svg'
import { useState } from 'react'

type Props ={
  charNum:number,
  setSoundOn: any,
}

const TaskBar = ({ charNum, setSoundOn }: Props) => {
  const [help, setHelp] = useState<boolean>(false)

  const handleClick = () => {
    setSoundOn(false)
    console.log('sound off')
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