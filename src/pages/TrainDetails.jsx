//rafce

import { useEffect } from "react";
import { useParams } from "react-router-dom";

const API_URL = "https://mocki.io/v1/4582f754-3228-4f96-a2a7-3206d65fc261";

const TrainDetails = () => {

  // make an api call to fetch the train details from the API_URL and store it in a state it in a state vaiable called trainDetails
  const [trainDetails, setTrainDetails] = useState(null);

  const { train_number } = useParams();

  useEffect(() => {
    const fetchTrainDetails = async() => {
      try {
        const response = await fetch(`${API_URL}?train_number=${train_number}`);
        const data = await response.json();
      } catch (error) {
        console.log("Error fectching details: ", error)
      }
    }

    fetchTrainDetails();
  }, [train_number])
  return (
    <div>
      TrainDetails
    </div>
  )
}

export default TrainDetails


export default TrainDetails

