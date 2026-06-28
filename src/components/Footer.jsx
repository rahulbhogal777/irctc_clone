import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import styles from "../styles/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Social Media Section */}
      <div className={styles.socialMedia}>
        <p>Get Connected with us on Social Networks</p>

        <div className={styles.icons}>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.icon}
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.icon}
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.icon}
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Footer Links */}
      <div className={styles.footerLinks}>
        <div>
          <h4>IRCTC Trains</h4>
        </div>
        <div>
          <h4>General Information</h4>
        </div>
        <div>
          <h4>Important Information</h4>
        </div>
        <div>
          <h4>Agents</h4>
        </div>
        <div>
          <h4>Enquiries</h4>
        </div>
        <div>
          <h4>How To</h4>
        </div>
        <div>
          <h4>IRCTC eWallet</h4>
        </div>
        <div>
          <h4>IRCTC Official App</h4>
        </div>
        <div>
          <h4>Advertise With Us</h4>
        </div>
        <div>
          <h4>Refund Rules</h4>
        </div>
        <div>
          <h4>Person with Disability Facilities</h4>
        </div>
        <div>
          <h4>For Newly Migrated Agents</h4>
        </div>
        <div>
          <h4>Mobile Zone</h4>
        </div>
        <div>
          <h4>Policies</h4>
        </div>
        <div>
          <h4>About Us</h4>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
