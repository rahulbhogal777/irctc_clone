import trainImg from "../assets/trainImg.webp";
import {
  FaTrain,
  FaExchangeAlt,
  FaCalendarAlt,
  FaSuitcase,
} from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  // const getMaxDate = () => {
  //   const maxDate = new Date();
  //   maxDate.setMonth(maxDate.getMonth() + 3);
  //   console.log(maxDate.toISOString().split("T")[0])
  //   return maxDate.toISOString().split("T")[0];
  // };
  const getMaxDate = new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split("T")[0];

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [travelClass, setTravelClass] = useState("All Classes");
  const [quota, setQuota] = useState("General");

  const handleSwapStations = () => {
    const temp = to;
    setTo(from);
    setFrom(temp);
  };

  const handleSearchTrains = (e) => {
    e.preventDefault();

    if (!from || !to) {
      alert("Please fill both source and destination.");
    }
    navigate(
      `/trainlist?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}&class=${encodeURIComponent(travelClass)}&quota=${encodeURIComponent(quota)}`,
    );
  };

  return (
    <>
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
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Enter source station"
                  required
                />
              </div>

              <button
                type="button"
                className={styles.swapButton}
                onClick={handleSwapStations}
              >
                <FaExchangeAlt className={styles.icon} />
              </button>

              <div className={styles.inputWrapper}>
                <FaTrain className={styles.icon} />
                <input
                  className={styles.input}
                  type="text"
                  id="destination"
                  name="destination"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
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
                  max={getMaxDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputWrapper}>
                <FaSuitcase className={styles.icon} />
                <select
                  className={styles.select}
                  id="class"
                  name="class"
                  value={travelClass}
                  onChange={(e) => setTravelClass(e.target.value)}
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
                <select
                  className={styles.select}
                  name="quota"
                  value={quota}
                  onChange={(e) => setQuota(e.target.value)}
                  required
                >
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
              <button
                type="submit"
                className={styles.searchButton}
                onClick={handleSearchTrains}
              >
                Search Trains
              </button>

              <button
                type="button"
                className={styles.showTrainButton}
                onClick={() => navigate("/trainlist")}
              >
                Show All Trains
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;
