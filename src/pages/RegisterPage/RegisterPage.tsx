import '../LoginPage/_login_page.scss';
import { Logo } from '../../components/Logo/Logo';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth/authSlice";
import './RegisterPage.scss'
import {useNavigate} from "react-router";
import {RegisterForm} from "../../components/Formik/Forms/RegisterForm";


export const RegisterPage = () => {
    const user = useSelector(selectCurrentUser);
    const navigator = useNavigate();

    // useEffect(() => {
    //     if(user) {
    //         navigator(navigateToDefaultRoute(user));
    //     }
    // }, []);

    return (
    <div className='login-page'>
      <div className='login-page__container'>
        <Logo classType='logo' />
          <h2 className={'login-page__container-header'}>zarejestruj się</h2>
        <RegisterForm />
      </div>
    </div>
  );
};