import { useState } from "react";
import { FaGoogle, FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AuthModal.module.css";


function Login({ isOpen }) {
  const navigate = useNavigate();
  // State variable that hold email and passwork inputs value
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    navigate(-1);
  };

  // handle model login open/close
  if (!isOpen) return null;
  return (
    <>
      {/* For Overlay background */}
      <div className={`${styles.overlay} ${isOpen ? styles.show : ""}`}>
        {/* Modal content container */}
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={handleClose}>
            <FaRegWindowClose />
          </button>
          <h3>Login</h3>
          <form>
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
            <button type="submit">Login</button>
          </form>
          {/* Google Login Button */}
          <button className={styles.googleBtn}>
            <FaGoogle />
            Login with Google
          </button>
          {/* <p>
            Don't have an account? <span>Register here</span>
          </p> */}
        </div>
      </div>
    </>
  );
}

export default Login;
