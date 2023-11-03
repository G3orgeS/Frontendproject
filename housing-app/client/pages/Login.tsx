import ImgWrapper from '../components/ImgWrapper';
import LoginForm from '../components/LoginForm'

const Login = () => {
  const homepage = '../resource/login.jpg';
  return (
    <>
      <ImgWrapper src={homepage} alt={'bild'} />
      <LoginForm />
    </>
  )
}
export default Login

