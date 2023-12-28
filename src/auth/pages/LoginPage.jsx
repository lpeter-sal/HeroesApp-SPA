import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

import style from './LoginPage.module.css'


export const LoginPage = () => {

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();


  const onLogin = () => {

    const lastPath = localStorage.getItem('lastPath') || '/';

    login('Bienvenido');

    navigate(lastPath, {
      replace: true
    });
  }



  return (
    <body className={style.bodyLogin}>
      <div className={style.wrapper}>
        <div className={style.fromWrapper}>
          <form action="">
            <h2 className={style.h2Style}> Login </h2>
            <div className={style.inputGroup}>
                <input className={style.inputGroupInput} type="text" disabled />
                <label className={style.inputGroupLabel}> Presiona en login para iniciar sesion</label>
            </div>

            <button
              className={style.btnCustom}
              onClick={ onLogin }
            >
              Login
            </button>
          </form>
        </div>
      </div>




    </body>
  )
}
