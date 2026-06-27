import { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineHelp } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

import trainLogo from "../assets/trainLogo.webp";
import styles from "../styles/Navbar.module.css";

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
        <div className={styles.logoContainer}>
          <img src={trainLogo} alt="Train Logo" className={styles.logo} />
          <span className={styles.logoText}>IRCTC Clone</span>
        </div>

        {/* Navigation */}
        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>
            Booking
          </Link>

          <Link to="/" className={styles.navLink}>
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
              <button className={styles.authButton} onClick={handleLogin}>
                Login
              </button>

              <button className={styles.registerButton}>Register</button>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
