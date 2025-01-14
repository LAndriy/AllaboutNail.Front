import React from "react";
import "../Style/Auth.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Rejestracja...");
    // Obsługa rejestracji
  };

  return (
    <div className="auth-container">
      <h2>Zarejestruj się</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <input
          type="text"
          id="register-username"
          name="username"
          placeholder="Nazwa użytkownika"
          autoComplete="on"
          required
        />
        <input
          type="password"
          id="register-password"
          name="password"
          placeholder="Hasło"
          required
        />
        <input
          type="password"
          id="confirm-password"
          name="passwordConfirm"
          placeholder="Potwierdź hasło"
          required
        />
        <input
          type="tel"
          id="register-phone"
          name="phone"
          placeholder="Telefon"
          autoComplete="on"
          required
        />
        <button type="submit">Zarejestruj się</button>
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
        <p className="link">Posiadasz już konto? <a className="link" href="/login">Zaloguj się</a></p>
      </div>
    </div>
  );
};

export default Register;
