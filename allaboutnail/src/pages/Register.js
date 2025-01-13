import React from "react";
import "../Style/Auth.css";

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
            <a href="#" className="form_google">
              <span>Kontynuuj z Google</span>
            </a>
          </li>
          <li>
            <a href="#" className="form_facebook">
              <span>Kontynuuj z Facebook</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Register;
