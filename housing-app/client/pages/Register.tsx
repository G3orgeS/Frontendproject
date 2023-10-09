import ImgWrapper from '../components/ImgWrapper'
import RegisterForm from '../components/RegisterForm'

const Register = () => {

  const img = '../resource/registerimage.jpg'

  return (
    <>
    <ImgWrapper src={img} alt='bild' />
      <RegisterForm />
    </>
  )
}

export default Register