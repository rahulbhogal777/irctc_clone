import { useState } from "react";

function Booking() {
  const [trainDetails, setTrainDetails] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [availableClasses, setAvailableClasses] = useState([]);
  const [classPrice, setClassPrice] = useState({});

  // handle class change for selected class
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  return (
    <>
      <div className={styles.container}>
        {/* Train Details */}
        <h2>Book Your Train Ticket </h2>
        <div className={styles.trainSummary}>
          <h3>Train Details</h3>
          <div className={styles.detailsGrid}>
            <div>
              <strong>Train Number: </strong>
              {trainDetails.trainNumber}
            </div>
            <div>
              <strong>Train Name: </strong>
              {trainDetails.trainName}
            </div>
            <div>
              <strong>From : </strong>
              {trainDetails.from}
            </div>
            <div>
              <strong>To: </strong>
              {trainDetails.to}
            </div>
            <div>
              <strong>Date: </strong>
              {trainDetails.date}
            </div>
            <div>
              <strong>Departure: </strong>
              {trainDetails.departure_time}
            </div>
            <div>
              <strong>Arrival: </strong>
              {trainDetails.arrival_time}
            </div>
            <div>
              <strong>Duration: </strong>
              {trainDetails.duration}
            </div>
            <div>
              <strong>Class: </strong>
              <select
                value={selectedClass}
                onChange={handleClass}
                style={{
                  marginLeft: "10px",
                  padding: "30px",
                  borderRadius: "5px",
                }}
              >
                {availableClasses.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}(₹{classPrice[cls]})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <strong>Quota: </strong>
              {trainDetails.quota}
            </div>
          </div>
        </div>

        {/* Passenger detail */}
        <form>
          <div className={styles.passengerSection}>
            <h3>Passenger Details</h3>
            <div className={styles.passengerCard}>
              <h4>Passenger 1</h4>
              {/* Name */}
              <div className={styles.inputGroup}>
                <label htmlFor="">
                  Name:
                  <input
                    type="text"
                    value=""
                    required
                    placeholder="Enter full Name as per Govt. Id"
                  />
                </label>
              </div>
              {/* Age */}
              <div className={styles.inputGroup}>
                <label htmlFor="">
                  Age:
                  <input
                    type="number"
                    value=""
                    required
                    placeholder="Enter your age in years"
                    min={3}
                  />
                </label>
              </div>
              {/* Gender */}
              <div className={styles.inputGroup}>
                <label htmlFor="">
                  Gender:
                  <select name="gender" onChange={() => {}}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              {/* Berth Preference */}
              <div className={styles.inputGroup}>
                <label htmlFor="">
                  Berth Preference:
                  <select name="berthPreference" onChange={() => {}}>
                    <option value="lower">Lower</option>
                    <option value="middle">Middle</option>
                    <option value="upper">Upper</option>
                  </select>
                </label>
              </div>
              {/* Button to remove passenger (if more than 1 passenger*/}
              <button type="button" className={style.removeButton} onClick={() => {}}>Remove</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Booking;
