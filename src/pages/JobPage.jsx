import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
function JobPage() {
    const [job,setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();
    useEffect(function(){
        async function fetchJob(){
            try {
                const res = await fetch(`/api/jobs/${id}`);
                const data = await res.json();
                console.log(data);
                setJob(data);

            } catch (error) {
                console.log('Error fetching data', error);
                throw new Error('Error Fetching Data from SERVER');
            } finally {
                setIsLoading(false)
            }
        }

        fetchJob();
    },[])
    return (
       isLoading ? <Spinner /> : <h1>{job.title}</h1>
    )
}

// async function jobLoader(){

// }

export default JobPage
