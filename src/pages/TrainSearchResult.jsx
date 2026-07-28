import { useEffect, useState } from "react";
import ModifySearch from "../components/ModifySearch.jsx";
import { useAuth } from "../context/authContext.jsx";
import styles from "../styles/TrainSearchResult.module.css";
import { useNavigate } from "react-router-dom";
import train_data from "../public/data/trainData.json";

// const API_URL = "https://mocki.io/v1/0eb9aeed-eb15-42e5-805c-fbf8bbee39ce"; // to fetch the train data from the mock API
function TrainSearchResult() {
  // const { currentUser } = useAuth(); // Access the currentUser object from the authentication context
  const navigate = useNavigate();
  const [trainData, setTrainData] = useState([]); // state to hold the fetched train data

  useEffect(() => {
    // fetch(API_URL)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Fectched train data:", data);
    //     // You can set the fetched data to state here if needed
    //     setTrainData(data.data);
    //   })
    //   .catch((error) => {
    //     console.log("Error fetching train data: ", error);
    //   });
    setTrainData(train_data);
    
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleTrainDetailsClick = (trainNumber) => {
    navigate(`/train-details/${trainNumber}`);
  }


  return (
    <>
      {/* Modify Search component */}
      <ModifySearch />
      {/* TrainSearchResullt */}
      <div className={styles.container}>
        <div className={styles.filterSection}>
          <div className={styles.filterColumn}>
            <h3>Travel Classes</h3>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> AC 3 Tier
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> AC 2 Tier
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> AC 1 Tier
            </label>
          </div>

          <div className={styles.filterColumn}>
            <h3>Train type</h3>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Rajdhani
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Shatabdi
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Express
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Vande Bharat
            </label>
          </div>

          <div className={styles.filterColumn}>
            <h3>Departure Time</h3>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> 00:00 - 06:00
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> 06:00 - 12:00
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> 12:00 - 18:00
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> 18:00 - 24:00
            </label>
          </div>
        </div>

        {/* Train list cards */}
        <div className={styles.trainList}>
          {trainData.length === 0 ? (
            <div className={styles.noTrain}>
              No trains available for the selected criteria.
            </div>
          ) : (
            trainData.map((train) => (
              <div className={styles.trainCard} key={train.train_number}>
                <div className={styles.trainHeader}>
                  <span className={styles.trainName}>
                    {train.train_name} ({train.train_number})
                  </span>
                  <span className={styles.trainSchedule}>Train Schedule</span>
                </div>
                <div className={styles.trainDetails}>
                  <div className={styles.timeInfo}>
                    <span>{train.departure_time}</span>
                    <span>{train.source}</span>
                  </div>
                  <span className={styles.durationInfo}>
                    {Array.isArray(train.days_of_operation)
                      ? train.days_of_operation.join(",")
                      : train.days_of_operation}
                  </span>
                  <div className={styles.timeInfo}>
                    <span>{train.arrival_time}</span>
                    <span>{train.destination}</span>
                  </div>
                </div>
                <div className={styles.classInfo}>
                  {/* Use the price object keys as available classes */}
                  {train.price ? (
                    Object.keys(train.price).map((cls) => (
                      <span key={cls}>
                        {cls}(₹{train.price[cls]})
                      </span>
                    ))
                  ) : (
                    <span>No class information available</span>
                  )}
                </div>
                <div className={styles.actionButtons}>
                  <button
                    className={styles.bookNowButton}
                    onClick={() => handleTrainDetailsClick(train.train_number)}
                  >
                    Book now
                  </button>
                  <button
                    className={styles.otherDatesButton}
                    onClick={() => handleTrainDetailsClick(train.train_number)}
                  >
                    Other Dates
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default TrainSearchResult;
