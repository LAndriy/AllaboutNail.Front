import React from "react";
import "../Style/Auth.css";

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

export default Login;
