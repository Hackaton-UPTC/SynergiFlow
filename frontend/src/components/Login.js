import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

function Login({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const triggerLoginError = () => {
    setLoginFailed(true);
    setTimeout(() => setLoginFailed(false), 500);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (username.trim().length < 3 || password.length < 6) {
      triggerLoginError();
      return;
    }

    try {
      setLoginLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/auth`, {
        action: "login",
        username: username.trim(),
        password,
      });

      const payload = response.data?.data;

      if (!payload?.token || !payload?.user?.username) {
        triggerLoginError();
        return;
      }

      localStorage.setItem("synergiflow.session", JSON.stringify(payload));
      onSuccess(payload);
    } catch {
      triggerLoginError();
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="screen placeholder-screen">
      <form
        className={`login-panel ${loginFailed ? "login-panel-error" : ""}`}
        onSubmit={handleLoginSubmit}
      >
        {loginFailed && (
          <div className="login-warning" aria-hidden="true">
            ⚠️
          </div>
        )}

        <div className="brand-pill">Enterprise Friction as a Service</div>
        <h1>Login</h1>
        <p>Loading desbloqueado correctamente.</p>

        <label className="login-field">
          <span>Usuario</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </label>

        <label className="login-field">
          <span>Contraseña</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>

        <button className="onboarding-button" type="submit" disabled={loginLoading}>
          {loginLoading ? "Verificando credenciales" : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}

export default Login;
