import { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineHelp } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";

import trainLogo from "../assets/trainLogo.webp";
import irctcLogo from "../assets/irctcLogo.jpg";
import styles from "../styles/Navbar.module.css";
import Footer from "./Footer";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  

  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <nav className={styles.navbar}>
        {/* Logo */}
        <Link to="/" className={styles.logoLink}>
          <div className={styles.logoContainer}>
            <img src={trainLogo} alt="Train Logo" className={styles.logo} />
            <span className={styles.logoText}>IRCTC Clone</span>
          </div>
        </Link>

        {/* Navigation */}
        <div className={styles.navLinks}>
          <Link to="/booking" className={styles.navLink}>
            Booking
          </Link>

          <Link to="/contact" className={styles.navLink}>
            Contact Us
          </Link>
        </div>

        {/* Date & Time */}
        <div className={styles.dateTime}>
          <span>{currentTime.toLocaleDateString("en-IN")}</span>
          <span>[{currentTime.toLocaleTimeString()}]</span>
        </div>

        {/* Icons */}
        <div className={styles.icons}>
          <IoIosNotifications className={styles.icon} />
          <MdOutlineHelp className={styles.icon} />
        </div>

        {/* Authentication */}
        <div className={styles.authSection}>
          {isLoggedIn ? (
            <>
              <span className={styles.welcome}>Welcome! {localStorage.getItem('userName') }</span>

              <button className={styles.authButton} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className={styles.authButton}>Login</button>
              </Link>

              <Link to="/register">
                <button className={styles.registerButton}>Register</button>
              </Link>
            </>
          )}
        </div>

        {/* IRCTC LOGO */}
        <img src={irctcLogo} alt="IRCTC Logo" className={styles.irctcLogo} />
      </nav>

      <main>
        <Outlet
          context={{
            handleLogin,
            handleLogout,
            switchToLogin: () => navigate("/login"),
            switchToRegister: () => navigate("/register"),
          }}
        />
      </main>

      <Footer />
    </>
  );
}

export default Navbar;
