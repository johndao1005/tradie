import React from 'react'
import JobTable from './components/JobTable'
let data = require("../../data/data.json");

function JobList() {
     /* -------------------------- state and variable ------------------------- */
    
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