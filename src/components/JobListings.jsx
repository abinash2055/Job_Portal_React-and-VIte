import { JobListing } from "./JobListing";
import { useState, useEffect } from "react";
// import PropTypes from "prop-types";

const JobListings = ({ isHome = true }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/jobs");
        const data = await res.json();
        console.log(typeof data);
        setJobs(data);
      } catch (error) {
        console.error("Error in fetching the data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "React Jobs" : "Browse Jobs"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <h2>Loading data...</h2>
          ) : (
            <>
              {console.log(jobs)}
              {jobs.map((job) => (
                <JobListing key={job.id} job={job} />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// JobListings.propTypes = {
//   isHome: PropTypes.bool,
// };

export default JobListings;
