import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

function JobDetails() {
    /* ---------------------------- variable and data --------------------------- */
    const [inputNote, setInputNote] = useState("")
    const location = useLocation()
    const data = location.state.data

    /* -------------------------------- funciton -------------------------------- */
    
    const handleAddNote = () =>{
        data.notes.push(inputNote)
        setInputNote("")
    }

    /* --------------------------------- render --------------------------------- */
    return (
        <>
        <h2>Job Details</h2>
        <div> Job Identifer : {data.id}</div>
        <div> Job Name : {data.name}</div>
        <div> Job Status : {data.status}</div>
        <div> Creation date : {data.date}</div>
        <h2>Client details</h2>
        <div> Client Name : {data.client.name}</div>
        <div> Client Email : {data.client.email}</div>
        <div> Client Phone : {data.client.phone}</div>
        <h2> Notes</h2>
        <div>
        <input
            value={inputNote}
            onChange={(input)=>setInputNote(input.target.value)}
            placeholder={"Add new note"}
        />
        <button onClick={handleAddNote}>Add Note</button>
        </div>
        <ul>
        {data.notes.map((note,index)=>{
            return <li key={index}>{note}</li>
        })}
        </ul>
        </>
    )
}

export default JobDetails