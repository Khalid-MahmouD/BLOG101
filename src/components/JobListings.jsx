
import { useEffect, useState } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner'
const URL = '/api/jobs'
function JobListings({ isHome = false }) {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(function () {
        async function fetchingJobs() {
            const apiURL = isHome ? `${URL}?_limit=3` : URL;
            try {
                const res = await fetch(apiURL);
                const data = await res.json();
                setJobs(data);

            } catch (error) {
                console.log('Error fetching data', error);
                throw new Error('Error Fetching Data from SERVER');
            } finally {
                setIsLoading(false)
            }

            // console.log(data);
        }
        fetchingJobs();
    }, []);

    // const jobListings=[]
    // const jobListings = isHome ? jobs.slice(0, 3) : jobs;
    return (
        <section className="bg-blue-50 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                    {isHome ? 'Recent Jobs' : 'Browse Jobs'}
                </h2>
                {
                    isLoading ? (
                        <div className="flex justify-center items-center h-screen">
                            <Spinner loading={isLoading} />
                        </div>
                    ) : (
                        jobs && jobs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {jobs.map((job) => (
                                    <JobListing job={job} key={job.id} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No jobs available at the moment.</p>
                        )
                    )
                }


            </div>
        </section>
    )
}

export default JobListings
