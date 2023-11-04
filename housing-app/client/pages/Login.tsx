import ImgWrapper from '../components/global/ImgWrapper';
import LoginForm from '../components/form/LoginForm'

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

