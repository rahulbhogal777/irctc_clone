import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import styles from "../styles/BookingConfirmationPage.module.css";

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, bookingDetails } = location.state || {};

  // handle case: booking data is unavailable, show some error
  if (!bookingId || !bookingDetails) {
    return (
      <div className={styles.container}>
        <h2>Booking Confirmation!</h2>
        <p>No booking information found. Please try booking again!</p>
        <button
          className={styles.button}
          onClick={() => {
            navigate("/trainlist");
          }}
        >
          Return to Train Search
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Booking confirmation */}
      <div className={styles.confirmationCard}>
        <div className={styles.header}>
          <h2>Booking Confirmed!</h2>
          <div className={styles.bookingId}>
            <span>Booking ID:</span>
            <strong>{bookingId}</strong>
          </div>
        </div>
      </div>

      {/* train details section */}
      <div className={styles.section}>
        <h3>Traiun Details</h3>
        <div className={styles.trainInfo}>
          <div className={styles.trainName}>
            <strong>{bookingDetails.trainDetails?.trainName}</strong>(
            {bookingDetails.trainDetails?.trainNumber})
          </div>
          <div className={styles.journeyDetails}>
            <div>
              <span className={styles.stationName}>
                {bookingDetails.trainDetails?.from}
              </span>
              <span className={styles.time}>
                {bookingDetails.trainDetails?.departureTime}
              </span>
            </div>
            <div>
              <FaArrowRight />
            </div>
            <div>
              <span className={styles.stationName}>
                {bookingDetails.trainDetails?.to}
              </span>
              <span className={styles.time}>
                {bookingDetails.trainDetails?.arrivalTime}
              </span>
            </div>
            <div className={styles.additionalInfo}>
              <div>Dtae: {bookingDetails.trainDetails?.date}</div>
              <div>Class: {bookingDetails.trainDetails?.travelClass}</div>
              <div>Duration: {bookingDetails.trainDetails?.duration}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Passanger details section */}
      <div className={styles.section}>
        <h3>Passenger Details</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Berth</th>
            </tr>
          </thead>
          <tbody>
            {bookingDetails.passengers.map((passenger, index) => {
              <tr key={index}>
                <td>{passenger.name}</td>
                <td>{passenger.age}</td>
                <td>{passenger.gender}</td>
                <td>{passenger.berth}</td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
      {/* Contact section */}
      <div className={styles.section}>
        <h3>Contact Information</h3>
        <div className={styles.contactInfo}>
          <diV>Email: {bookingDetails.contactInfo.email}</diV>
          <div>Phone: {bookingDetails.contactInfo.phone}</div>
        </div>
      </div>
      {/* Payment Section */}
      <div className={styles.section}>
        <h3>Payment Details</h3>
        <div className={styles.paymentInfo}>
          <div className={styles.paymentRow}>
            <span>Base Fare:</span>
            <span>{bookingDetails.paymentSummary.baseFare}</span>
          </div>
          <div className={styles.paymentRow}>
            <span>Catering Charges:</span>
            <span>{bookingDetails.paymentSummary.cateringCharge}</span>
          </div>
          <div className={styles.paymentRow}>
            <span>GST:</span>
            <span>{bookingDetails.paymentSummary.gst}</span>
          </div>
          <div className={styles.paymentRow}>
            <span>Convenience Fee:</span>
            <span>{bookingDetails.paymentSummary.convenienceFee}</span>
          </div>
          <div className={`${styles.totalRow} ${styles.paymentRow}`}>
            <span>Total Amount:</span>
            <span>{bookingDetails.paymentSummary.total}</span>
          </div>
        </div>
      </div>
      {/* Button fro navigation to home */}
      <button
        className={`${styles.button} ${styles.homeButton}`}
        onClick={() => navigate("/")}
      >
        Return To Home
      </button>
    </div>
  );
};

export default BookingConfirmationPage;
