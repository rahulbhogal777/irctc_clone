import { useState } from "react";
import { FaGoogle, FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginWithEmail, loginWithGoogle } from "../config/authService";
import styles from "../styles/AuthModal.module.css";

function Login({ isOpen, onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    navigate(-1);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await loginWithEmail(email, password);

      setEmail("");
      setPassword("");

      if (onLogin) onLogin();

      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      await loginWithGoogle();

      if (onLogin) onLogin();

      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.show : ""}`}>
      <div className={styles.modal}>
        <button
          className={styles.closeBtn}
          onClick={handleClose}
          disabled={loading}
        >
          <FaRegWindowClose />
        </button>

        <h2>Login</h2>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          className={styles.googleBtn}
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <FaGoogle />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
