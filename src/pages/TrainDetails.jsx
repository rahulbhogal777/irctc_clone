//rafce

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { FaTrainSubway } from "react-icons/fa6";

const API_URL = "https://mocki.io/v1/4582f754-3228-4f96-a2a7-3206d65fc261";

const TrainDetails = () => {
  // make an api call to fetch the train details from the API_URL and store it in a state it in a state vaiable called trainDetails
  const [trainDetails, setTrainDetails] = useState(null);
  const { train_number } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  console.log("Fetching train details for train number:", train_number);

  useEffect(() => {
    const fetchTrainDetails = async () => {
      try {
        const response = await fetch(API_URL); //list of trains is fetched from the API_URL
        const data = await response.json();
        //find the train details for the given train_number from the data and set it in the state variable
        const train = data.find((train) => train.train_number === train_number);
        if (!train) {
          throw new Error(`Train with number ${train_number} not found`);
        }
        setTrainDetails(train);
        // set the default selected class to the first class available in the train details
        if (train.price && Object.keys(train.price).length > 0) {
          setLoading(false);
        }
      } catch (error) {
        console.log("Error fectching details: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    console.log("trainDetails", trainDetails);

    fetchTrainDetails();
  }, [train_number]);

  // if loading is true, return a loading message

  if (loading) {
    return <div className={styles.loading}>Loading train details...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  //Get source and destination from the route array
  const source = trainDetails.route[0];
  const destination = trainDetails.route[trainDetails.route.length - 1];

  //Calculate the fare with service charge (5% of base fare)
  const baseFare =
    trainDetails.price && selectedClass ? trainDetails.price[selectedClass] : 0;
  const serviceCharge = baseFare * 0.05;
  const totalFare = baseFare + serviceCharge;

  return (
    <div className={styles.container}>
      {/* Head section with train details */}
      <h2>
        <FaTrainSubway />
        {trainDetails.train_name} ({trainDetails.train_number})
      </h2>

      {/* Days of operation */}
      <div className={styles.operationDays}>
        <h3>Days of Operation:</h3>
        <div className={styles.daysContainer}>
          {trainDetails.days_of_operation.map((day, index) => (
            <span key={index} className={styles.dayBadge}>
              {day}
            </span>
          ))}
        </div>
      </div>

      {/* source and destination */}
      <div className={styles.journeyInfo}>
        <div className={styles.journeyDetail}>
          <span>Departure:</span>
          <strong>{trainDetails.departure_time}</strong>
        </div>
        <div className={styles.journeyDetail}>
          <span>Duration:</span>
          <strong>{trainDetails.duration}</strong>
        </div>
        <div className={styles.journeyDetail}>
          <span>Arrival:</span>
          <strong>{trainDetails.arrival_time}</strong>
        </div>
      </div>

      {/* Route section (progress bar) */}
      <div className={styles.progressBar}>
        <div className={`${styles.station} ${styles.source}`}>
          <span className={styles.stationName}>{source.station_name}</span>
          <div className={styles.timeInfo}>
            <div>Arrival: {source.arrival_time}</div>
            <FaTrainSubway />
            <div>Departure: {source.departure_time}</div>
          </div>
        </div>

        {/* dynamically handle stops in between source and destination */}
        {trainDetails.route.slice(1, -1).map((station, index) => (
          <div
            key={index}
            className={`${styles.station} ${index % 2 == 0 ? styles.right : styles.left}`}
          >
            <span className={styles.stationName}>{station.station_name}</span>
            <div className={styles.timeInfo}>
              <div>Arrival: {station.arrival_time}</div>
              <FaTrainSubway />
              <div>Departure: {station.departure_time}</div>
            </div>
          </div>
        ))}

        {/* destination stop */}
        <div className={`${styles.station} ${styles.source}`}>
          <span className={styles.stationName}>{destination.station_name}</span>
          <div className={styles.timeInfo}>
            <div>Arrival: {destination.arrival_time}</div>
            <FaTrainSubway />
            <div>Departure: {destination.departure_time}</div>
          </div>
        </div>
      </div>

      {/* Price Section */}
      
    </div>
  );
};

export default TrainDetails;
