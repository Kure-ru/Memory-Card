import volumeIcon from '../../public/assets/volume.svg'

const Footer = () => {
  return (
    <footer>
      <button className='icon'>?</button>
      <button className='icon'>S</button>
      <img className='icon' alt='volume icon' src={volumeIcon}/>
      
      </footer>
  )
}

export default Footer