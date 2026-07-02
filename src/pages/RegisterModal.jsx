import { useState } from "react";
import { FaGoogle, FaRegWindowClose } from "react-icons/fa";
import styles from "../styles/AuthModal.module.css";

function Register({ isOpen }) {
  const [fullname, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;
  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.show : ""}`}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={handleClose}>
            <FaRegWindowClose />
          </button>
          <h3>Register</h3>
          <form>
            <input
              type="text"
              placeholder="FullName"
              value={fullname}
              onChange={(e) => setfullName(e.target.value)}
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
            <button type="submit">Register</button>
          </form>
          <button className={styles.googleBtn}>
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
