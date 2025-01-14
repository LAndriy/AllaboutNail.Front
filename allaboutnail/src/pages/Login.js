import React from "react";
import "../Style/Auth.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logowanie...");
    // Obsługa logowania
  };

  return (
    <div className="auth-container">
      <h2>Zaloguj się</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="text"
          id="login-username"
          name="username"
          placeholder="Nazwa użytkownika"
          autoComplete="on"
          required
        />
        <input
          type="password"
          id="login-password"
          name="password"
          placeholder="Hasło"
          required
        />
        <button type="submit">Zaloguj się</button>
      </form>
      <div className="form_or">
        <span>lub</span>
      </div>
      <div className="logwith">
        <ul>
          <li>
          <button className="icon-btn">
            <GoogleIcon className="google-icon" fontSize="medium"/>
              Kontynuuj z Google
            </button>
          </li>
          <li>
            <button className="icon-btn">
            <FacebookIcon className="facebook-icon" fontSize="medium"/>
              Kontynuuj z Facebook
            </button>
          </li>
        </ul>
        <p className="link">Nie masz konta? <a className="link" href="/register">Zarejestruj się</a></p>
      </div>
    </div>
  );
};

export default Login;
