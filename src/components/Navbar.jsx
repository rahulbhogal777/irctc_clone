import { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineHelp } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

import trainLogo from "../assets/trainLogo.webp";
import styles from "../styles/Navbar.module.css";
import irctcLogo from "../assets/irctcLogo.jpg";
import Footer from "./Footer";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const handleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // return () => clearInterval(timer);
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
              <span className={styles.welcome}>Welcome User</span>

              <button className={styles.authButton} onClick={handleLogin}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className={styles.authButton} onClick={handleLogin}>
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className={styles.registerButton}>Register</button>
              </Link>
            </>
          )}
        </div>

        {/* IRCTC LOGO */}
        <div>
          <img alt="IRCTC logo" src={irctcLogo} className={styles.irctcLogo} />
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Navbar;
