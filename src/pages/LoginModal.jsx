import { useState } from "react";
import { FaGoogle, FaRegWindowClose } from "react-icons/fa";
import { useNavigate, useOutletContext } from "react-router-dom";

import { loginWithEmail, loginWithGoogle } from "../config/authService";
import styles from "../styles/AuthModal.module.css";

function Login() {
  const navigate = useNavigate();

  // Receive functions from Navbar through Outlet Context
  const { handleLogin, switchToRegister } = useOutletContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    navigate("/");
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Your Firebase function (unchanged)
      await loginWithEmail(email, password);

      // Tell Navbar user is logged in
      handleLogin();

      setEmail("");
      setPassword("");

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
      // Your Firebase function (unchanged)
      await loginWithGoogle();

      // Tell Navbar user is logged in
      handleLogin();

      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.overlay} ${styles.show}`}>
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

        {/* Added navigation to Register */}
        <p className={styles.switchText}>
          Don't have an account?{" "}
          <span
            onClick={switchToRegister}
            style={{ color: "#007bff", cursor: "pointer" }}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
