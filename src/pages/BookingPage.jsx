import { field } from "firebase/firestore/pipelines";
import { useState } from "react";
import { useAuth } from "../context/authContext";

function Booking() {
  const currentUser = useAuth();
  const [trainDetails, setTrainDetails] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [availableClasses, setAvailableClasses] = useState([]);
  const [classPrice, setClassPrice] = useState({});
  const [passengers, setPassengers] = useState([
    {
      name: "",
      age: "",
      gender: "",
      berth: "No Preference",
    },
  ]);
  const [contactInfo, setContactInfo] = useState({
    email: currentUser?.email || "",
    phone: "",
  });

  // handle class change for selected class
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  // Update Passenger detail
  const updatePassenger = (index, field, value) => {
    const updatePassengers = [...passengers];
    updatePassengers[index][field] = value;
    setPassengers(updatePassengers);
  };

  // remove passenger
  const removePassenger = (index) => {
    if (passengers.length > 1) {
      const updatePassengers = [...passengers];
      updatePassengers.splice(index, 1);
      setPassengers(updatePassengers);
    }
  };

  // add passenger
  const addPassenger = () => {
    setPassengers([...passengers], {
      name: "",
      age: "",
      gender: "",
      berth: "No Preference",
    });
  };

  // fare calculation
  const calculateTotalFare = () => {
    const passegerCount = passengers.length;

    // get the fare for the selected class
    const baseFarePerPassenger = classPrice[selectedClass] || 0;
    const totalBaseFare = baseFarePerPassenger * passegerCount;

    // calculate addtional charges
    const gst = Math.round(totalBaseFare * 0.05); // 5% GST
    const convenienceFee = 30; //fixed
    const cateringCharge =
      selectedClass === "Executive Class"
        ? 150 * passegerCount
        : 120 * passegerCount;
    
    return {
      baseFare: totalBaseFare,
      gst,
      convenienceFee,
      cateringCharge,
      total: totalBaseFare + gst + convenienceFee + cateringCharge
    }
  };

  const fareDetails = calculateTotalFare();

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
            {passengers.map((passenger, index) => (
              <div key={index} className={styles.passengerCard}>
                <h4>Passenger ${index + 1}</h4>
                {/* Name */}
                <div className={styles.inputGroup}>
                  <label htmlFor="">
                    Name:
                    <input
                      type="text"
                      value={passenger.name}
                      required
                      placeholder="Enter full Name as per Govt. Id"
                      onChange={(e) =>
                        updatePassenger(index, "name", e.target.value)
                      }
                    />
                  </label>
                </div>
                {/* Age */}
                <div className={styles.inputGroup}>
                  <label htmlFor="">
                    Age:
                    <input
                      type="number"
                      value={passenger.age}
                      required
                      placeholder="Enter your age in years"
                      min={3}
                      onChange={(e) =>
                        updatePassenger(index, "age", e.target.value)
                      }
                    />
                  </label>
                </div>
                {/* Gender */}
                <div className={styles.inputGroup}>
                  <label htmlFor="">
                    Gender:
                    <select
                      name="gender"
                      value={passenger.gender}
                      onChange={(e) =>
                        updatePassenger(index, "gender", e.target.value)
                      }
                    >
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
                    <select
                      name="berthPreference"
                      value={passenger.berth}
                      onChange={(e) =>
                        updatePassenger(index, "berth", e.target.value)
                      }
                    >
                      <option value="lower">Lower</option>
                      <option value="middle">Middle</option>
                      <option value="upper">Upper</option>
                    </select>
                  </label>
                </div>
                {/* Button to remove passenger (if more than 1 passenger*/}
                {passenger.length > 1 && (
                  <button
                    type="button"
                    className={style.removeButton}
                    onClick={() => removePassenger(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className={styles.addButton}
              onClick={addPassenger}
            >
              Add Passenger
            </button>
          </div>

          {/* information/contact section */}
          <div className={styles.contactSection}>
            <h3>contact Information</h3>
            {/* Emaill */}
            <div className={styles.inputGroup}>
              <label htmlFor="">
                Email:
                <input
                  type="email"
                  value={contactInfo.email}
                  required
                  placeholder="Enter email for e-ticket and update"
                  onChange={(e) => handleContactChange("email", e.target.value)}
                />
              </label>
            </div>
            {/* Phone number */}
            <div className={styles.inputGroup}>
              <label htmlFor="">
                Phone:
                <input
                  type="tel"
                  value={contactInfo.phone}
                  required
                  placeholder="Enter 10 digit mobile number"
                  pattern="[0-9]{10}"
                  title="Phone number must be of 10 digits"
                  onChange={(e) => handleContactChange("phone", e.target.value)}
                />
              </label>
            </div>
          </div>
          {/* payment section */}
          <div className={styles.paymentSection}>
            <h3>Payment Summary</h3>
            <div className={styles.paymentDetails}>
              <div>
                <span>
                  Base Fare ({selectedClass}*{passengers.length}):
                </span>
                <span>₹{fareDetails.baseFare}</span>
              </div>
              <div>
                <span>Catering Changes:</span>
                <span>₹{fareDetails.cateringCharge}</span>
              </div>
              <div>
                <span>GST (5%):</span>
                <span>₹{fareDetails.gst}</span>
              </div>
              <div>
                <span>Convenience fee:</span>
                <span>₹{fareDetails.convenienceFee}</span>
              </div>
              <div className={styles.totalAmount}>
                <span>Total Amount:</span>
                <span>₹{fareDetails.total}</span>
              </div>
            </div>
          </div>

          {/*terms section */}
          <div className={styles.termsSection}>
            <label htmlFor="">
              <input type="checkbox" />
              Agree to the Teams and Conditions with cancellation policy.
            </label>
          </div>

          {/*  payment proceed button*/}
          <div className={styles.buttonGroup}>
            <button type="submit" className={style.payButton}>Proceed to Payment</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Booking;
