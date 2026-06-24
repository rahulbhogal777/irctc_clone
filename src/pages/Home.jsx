import trainImg from "../assets/trainImg.webp";
import {
  FaTrain,
  FaExchangeAlt,
  FaCalendarAlt,
  FaSuitcase,
} from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import styles from "../styles/Home.module.css";

function Home() {
  const today = new Date().toLocaleDateString("en-CA");

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <img src={trainImg} alt="train image" className={styles.trainImage} />
      </div>

      <div className={styles.bookingForm}>
        <h2>BOOK TICKET</h2>

        <form>
          {/* Source & Destination */}
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <FaTrain className={styles.icon} />
              <input
                className={styles.input}
                type="text"
                id="source"
                name="source"
                placeholder="Enter source station"
                required
              />
            </div>

            <button type="button" className={styles.swapButton}>
              <FaExchangeAlt className={styles.icon} />
            </button>

            <div className={styles.inputWrapper}>
              <FaTrain className={styles.icon} />
              <input
                className={styles.input}
                type="text"
                id="destination"
                name="destination"
                placeholder="Enter destination station"
                required
              />
            </div>
          </div>

          {/* Date & Class */}
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <FaCalendarAlt className={styles.icon} />
              <input
                className={styles.input}
                type="date"
                id="date"
                name="date"
                min={today}
                required
              />
            </div>

            <div className={styles.inputWrapper}>
              <FaSuitcase className={styles.icon} />
              <select
                className={styles.select}
                id="class"
                name="class"
                required
              >
                <option value="">All Classes</option>
                <option value="sleeper">Sleeper</option>
                <option value="ac3">AC 3 Tier</option>
                <option value="ac2">AC 2 Tier</option>
                <option value="ac1">AC 1 Tier</option>
              </select>
            </div>
          </div>

          {/* Quota */}
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <BiSolidCategory className={styles.icon} />
              <select className={styles.select} name="quota" required>
                <option value="general">General</option>
                <option value="ladies">Ladies</option>
                <option value="tatkal">Tatkal</option>
                <option value="premium_tatkal">Premium Tatkal</option>
                <option value="duty_pass">Duty Pass</option>
              </select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className={styles.checkboxGroup}>
            <label>
              <input type="checkbox" />
              Person with Disability (PwD)
            </label>

            <label>
              <input type="checkbox" />
              Flexible with Date
            </label>

            <label>
              <input type="checkbox" />
              Railway Pass Concession
            </label>
          </div>

          {/* Buttons */}
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.searchButton}>
              Search Trains
            </button>

            <button type="button" className={styles.showTrainButton}>
              Show Trains
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
