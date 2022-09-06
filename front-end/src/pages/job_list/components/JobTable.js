import React, { useMemo, useState } from 'react'
import { useFilters, useSortBy, useTable } from 'react-table';
import StatusOptions from './StatusOptions';

function JobTable({ data }) {
    const [filterInput, setFilterInput] = useState("")
    const columns = useMemo(
        () => [
            {
                // first group - TV Show
                Header: "Job ID",
                accessor: "id",

            },
            {
                // first group - TV Show
                Header: "Name",
                accessor: "name",
            },
            {
                // first group - TV Show
                Header: "Status",
                accessor: "status",
                Cell: (cell)=>{
                    return (
                        <StatusOptions cell={cell}/>
                    )
                }
                
            },
            {
                // first group - TV Show
                Header: "Creation Date",
                accessor: "date",
            },
            {
                // Second group - Details
                Header: "Client",
                // Second group columns
                columns: [
                    {
                        Header: "Name",
                        accessor: "client.name",
                    },
                    {
                        Header: "Email",
                        accessor: "client.email",
                    },
                    {
                        Header: "Phone",
                        accessor: "client.phone",
                    },
                ],
            },
        ],
        []
    );

    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow,
        setFilter  // Prepare the row (this function needs to be called for each row before getting the row props)
    } = useTable({
        columns,
        data,
    },
        useFilters,
        useSortBy
    );
    /* -------------------------------- funciton -------------------------------- */
    const handleFilterChange = e => {
        const value = e.target.value || "";
        setFilter("name", value);
        setFilterInput(value);
    };
    
    /* --------------------------------- component render --------------------------------- */
    const filterField = () => {
        return <input
            value={filterInput}
            onChange={handleFilterChange}
            placeholder={"Search name"}
        />
    }

    const mainTable = () => {
        return <table {...getTableProps()}>
        <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => {
                        return (
                            <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                className={
                                    column.isSorted
                                        ? column.isSortedDesc
                                            ? "sort-desc"
                                            : "sort-asc"
                                        : ""
                                }
                            >{column.render("Header")} </th>
                        )
                    })}
                </tr>
            ))}
        </thead>

        <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row);
                return (
                    <tr
                    
                        // onClick={(e) => togglePopover(e, row.original.id)} 
                        {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                            return <td  {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                        })}
                    </tr>
                )
            })}
        </tbody>
    </table>
    }
    return (
        <>
            {filterField()}
            {mainTable()}
        </>
    );
}

export default JobTable