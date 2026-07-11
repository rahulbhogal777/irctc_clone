import { useState } from "react";
import { FaGoogle, FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AuthModal.module.css";
import { loginWithGoogle, registerUserWithEmail } from "../config/authService";

function Register({ isOpen, switchToLogin }) {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };

  //handle user register with email
  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);
    try {
      await registerUserWithEmail(fullname, email, password);
      setEmail("");
      setPassword("");
      setFullName("");
      handleClose();
      // swith to login
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  //Handle register with google
  const handleGoogleRegister = async () => {
    setError("");
    setLoading(true);

    try {
      await loginWithGoogle();

      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.show : ""}`}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={handleClose}>
            <FaRegWindowClose />
          </button>
          <h3>Register</h3>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="FullName"
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
            />
            <button type="submit" disabled={loading}>{loading?"Registering...":"Register"}</button>
          </form>
          <button className={styles.googleBtn} onClick={handleGoogleRegister} disabled={loading}>
            <FaGoogle />
            Register with Google
          </button>
          <p>
            Already have an account? <span>Login here</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
