import ImgWrapper from '../components/global/ImgWrapper';
import LoginForm from '../components/form/LoginForm'

const LoginImg = '../resource/profil.jpg';
const Login = () => {
  return (
    <>
      <ImgWrapper src={LoginImg} alt={'bild'} />
      <LoginForm />
    </>
  )
}
export default Login

