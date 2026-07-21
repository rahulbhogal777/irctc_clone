import { useState } from "react";
import styles from "../styles/ModifySearch.module.css";

function ModifySearch() {
  // State to manage the search parameters
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
    travelClass: "",
    quota: "",
  });

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <div className={styles.searchForm}>
        <h2>Modify Search</h2>
        <form>
          <input
            type="text"
            placeholder="From"
            value={searchParams.from}
            onChange={(e) =>
              setSearchParams({ ...searchParams, from: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="To"
            value={searchParams.to}
            onChange={(e) =>
              setSearchParams({ ...searchParams, to: e.target.value })
            }
          />
          <input
            type="date"
            value={searchParams.date}
            onChange={(e) =>
              setSearchParams({ ...searchParams, date: e.target.value })
            }
            min={today}
          />
          <select
            value={searchParams.travelClass}
            onChange={(e) =>
              setSearchParams({ ...searchParams, travelClass: e.target.value })
            }
          >
            <option value="">Select Class</option>
            <option value="sleeper">Sleeper</option>
            <option value="3AC">AC 3 Tier</option>
            <option value="2AC">AC 2 Tier</option>
            <option value="1AC">AC 1 Tier</option>
          </select>
          <select
            value={searchParams.quota}
            onChange={(e) =>
              setSearchParams({ ...searchParams, quota: e.target.value })
            }
          >
            <option value="">Select Quota</option>
            <option value="general">General</option>
            <option value="ladies">Ladies</option>
            <option value="tatkal">Tatkal</option>
            <option value="premium tatkal">Premium Tatkal</option>
            <option value="duty pass">Duty Pass</option>
          </select>

          <button type="sumbit">Search</button>
        </form>
      </div>
    </>
  );
}

export default ModifySearch;
