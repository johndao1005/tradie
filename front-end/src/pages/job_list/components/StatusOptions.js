import React, { useState } from 'react'

function StatusOptions({cell}) {
  const options = ["scheduled", "active", "invoicing", "to priced", "completed"];
  const rowID = cell.row.id
  const data = cell.data[rowID]
  const [currentStatus, setCurrentStatus] = useState(data.status)
  const [open, setOpen] = useState(false)

  const handleSelect = (status) =>{
    setOpen(!open)
    data.status = status
    setCurrentStatus(status)
  }

  return (
    <details
    open={open}
    >
    <summary>
      {currentStatus}
      </summary>
    {options.map(option => {
      return <div 
      key={option}
      onClick={() => handleSelect(option)}
      >{option}</div>;
    })}
  </details>
  )
}

export default StatusOptions