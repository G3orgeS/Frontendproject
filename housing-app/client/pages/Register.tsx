import ImgWrapper from '../components/global/ImgWrapper'
import RegisterForm from '../components/form/RegisterForm'

const Register = () => {

  const img = '../resource/register.jpg'

  return (
    <>
    <ImgWrapper src={img} alt='bild' />
      <RegisterForm />
    </>
  )
}

export default Register