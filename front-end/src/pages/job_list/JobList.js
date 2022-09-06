import JobTable from './components/JobTable'
import React from 'react'

function JobList() {
    /* -------------------------- state and variable ------------------------- */
    let data = require("../../data/data.json"); // can change to fetch with useEffect if using url
    
     /* ---------------------------- render component ---------------------------- */
    const table = () =>{
        if(!data || data.jobs.length === 0){
            return <div>Sorry you got no job at the moment. Take a break</div>
        }
        return <JobTable data={data.jobs}/>
    }
    return (
        <>
        <div>JobTable</div>
        {table()}
        </>
      )
}

export default JobList