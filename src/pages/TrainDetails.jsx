//rafce

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrainSubway } from "react-icons/fa6";
import styles from "../styles/TrainDetails.module.css";

const API_URL =
  "https://mocki.io/v1/4582f754-3228-4f96-a2a7-3206d65fc261";

const TrainDetails = () => {
  const { train_number } = useParams();
  const navigate = useNavigate();

  const [trainDetails, setTrainDetails] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrainDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch train details.");
        }

        const data = await response.json();

        const train = data.find(
          (item) => item.train_number === train_number
        );
        console.log("URL train_number:", train_number);
        console.log(data);

        if (!train) {
          throw new Error(`Train ${train_number} not found.`);
        }

        setTrainDetails(train);

        // Select first available class by default
        if (train.price && Object.keys(train.price).length > 0) {
          setSelectedClass(Object.keys(train.price)[0]);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainDetails();
  }, [train_number]);

  if (loading) {
    return <div className={styles.loading}>Loading train details...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!trainDetails) {
    return <div className={styles.error}>No train details found.</div>;
  }

  const source = trainDetails.route[0];
  const destination =
    trainDetails.route[trainDetails.route.length - 1];

  const baseFare = selectedClass
    ? trainDetails.price[selectedClass]
    : 0;

  const serviceCharge = baseFare * 0.05;
  const totalFare = baseFare + serviceCharge;

  return (
    <div className={styles.container}>
      {/* Heading */}
      <h2 className={styles.title}>
        <FaTrainSubway /> {trainDetails.train_name} (
        {trainDetails.train_number})
      </h2>

      {/* Days of Operation */}
      <div className={styles.operationDays}>
        <h3>Days of Operation</h3>

        <div className={styles.daysContainer}>
          {trainDetails.days_of_operation.map((day) => (
            <span key={day} className={styles.dayBadge}>
              {day}
            </span>
          ))}
        </div>
      </div>

      {/* Journey Details */}
      <div className={styles.journeyInfo}>
        <div className={styles.journeyDetail}>
          <span>Departure</span>
          <strong>{trainDetails.departure_time}</strong>
        </div>

        <div className={styles.journeyDetail}>
          <span>Duration</span>
          <strong>{trainDetails.duration}</strong>
        </div>

        <div className={styles.journeyDetail}>
          <span>Arrival</span>
          <strong>{trainDetails.arrival_time}</strong>
        </div>
      </div>

      {/* Route */}
      <div className={styles.progressBar}>
        {/* Source */}
        <div className={`${styles.station} ${styles.source}`}>
          <span className={styles.stationName}>
            {source.station_name}
          </span>

          <div className={styles.timeInfo}>
            <div>Arrival: {source.arrival_time}</div>

            <FaTrainSubway />

            <div>Departure: {source.departure_time}</div>
          </div>
        </div>

        {/* Intermediate Stations */}
        {trainDetails.route.slice(1, -1).map((station, index) => (
          <div
            key={station.station_name}
            className={`${styles.station} ${
              index % 2 === 0 ? styles.right : styles.left
            }`}
          >
            <span className={styles.stationName}>
              {station.station_name}
            </span>

            <div className={styles.timeInfo}>
              <div>Arrival: {station.arrival_time}</div>

              <FaTrainSubway />

              <div>Departure: {station.departure_time}</div>
            </div>
          </div>
        ))}

        {/* Destination */}
        <div className={`${styles.station} ${styles.destination}`}>
          <span className={styles.stationName}>
            {destination.station_name}
          </span>

          <div className={styles.timeInfo}>
            <div>Arrival: {destination.arrival_time}</div>

            <FaTrainSubway />

            <div>Departure: {destination.departure_time}</div>
          </div>
        </div>
      </div>

      {/* Fare Information */}
      {trainDetails.price && (
        <div className={styles.priceCard}>
          <h3>Fare Information</h3>

          <div className={styles.classSelector}>
            {Object.keys(trainDetails.price).map((classType) => (
              <button
                key={classType}
                className={`${styles.classButton} ${
                  selectedClass === classType ? styles.active : ""
                }`}
                onClick={() => setSelectedClass(classType)}
              >
                {classType}
              </button>
            ))}
          </div>

          <div className={styles.priceDetails}>
            <span>Base Fare</span>
            <span className={styles.price}>
              ₹{baseFare.toFixed(2)}
            </span>
          </div>

          <div className={styles.priceDetails}>
            <span>Service Charge (5%)</span>
            <span className={styles.price}>
              ₹{serviceCharge.toFixed(2)}
            </span>
          </div>

          <div className={styles.priceDetails}>
            <strong>Total Fare</strong>

            <strong className={styles.price}>
              ₹{totalFare.toFixed(2)}
            </strong>
          </div>

          <button className={styles.bookButton}>
            Book Now ({selectedClass})
          </button>
        </div>
      )}

      <button
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default TrainDetails;