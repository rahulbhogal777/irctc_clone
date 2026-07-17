import { useState } from "react";
import { FaGoogle, FaRegWindowClose } from "react-icons/fa";
import { useNavigate, useOutletContext } from "react-router-dom";

import styles from "../styles/AuthModal.module.css";
import { loginWithGoogle, registerUserWithEmail } from "../config/authService";

function Register() {
  const navigate = useNavigate();

  // Get function from Navbar
  const { switchToLogin, handleLogin } = useOutletContext();

  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    navigate("/");
  };

  // Register with Email
  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Your Firebase function (unchanged)
      await registerUserWithEmail(fullname, email, password);

      setFullName("");
      setEmail("");
      setPassword("");

      // After successful registration, go to Login page
      switchToLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Register with Google
  const handleGoogleRegister = async () => {
    setError("");
    setLoading(true);

    try {
      // Your Firebase function (unchanged)
      await loginWithGoogle();

      // User is logged in
      handleLogin();

      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`${styles.overlay} ${styles.show}`}>
        <div className={styles.modal}>
          <button
            className={styles.closeBtn}
            onClick={handleClose}
            disabled={loading}
          >
            <FaRegWindowClose />
          </button>

          <h3>Register</h3>

          {error && <p className={styles.error}>{error}</p>}

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <button
            className={styles.googleBtn}
            onClick={handleGoogleRegister}
            disabled={loading}
          >
            <FaGoogle />
            <span>Register with Google</span>
          </button>

          <p>
            Already have an account?{" "}
            <span
              onClick={switchToLogin}
              style={{ color: "#007bff", cursor: "pointer" }}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
