import ImgWrapper from '../components/ImgWrapper'
import Filterbar from '../components/Filterbar'
import '../css/pages/Home.css'

const homepage = '../resource/Homepage.jpeg'
const Home = () => {
  return (
    <>
    <ImgWrapper src={homepage} alt={'bild'}/>
    <Filterbar />
    </>

  )
}

export default Home