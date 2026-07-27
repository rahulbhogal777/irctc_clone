import { useState } from "react";

function Booking() {

  const [trainDetails, setTrainDetails] = useState(null);

  return (
    <>
      <div className={styles.container}>
        <h2>Book Your Train Ticket </h2>
        <div className={styles.trainSummary}>
          <h3>Train Details</h3>
          <div className={styles.detailsGrid}>
            <div>
              <strong>Train Number: </strong>{trainDetails.trainNumber}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Booking;
