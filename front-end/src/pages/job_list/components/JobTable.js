import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFilters, useSortBy, useTable } from 'react-table';
import StatusOptions from './StatusOptions';


function JobTable({ data }) {
    /* --------------------------- state and variable --------------------------- */
    let navigator = useNavigate();
    const [filterInput, setFilterInput] = useState("")
    const columns = useMemo(
        () => [
            {
                Header: "Job ID",
                accessor: "id",
            },
            {
                Header: "Name",
                accessor: "name",
                Cell: (cell) => {
                    return (
                        <div style={{"color":"blue"}} onClick={() => {
                            // console.log(cell.row.original) 
                            navigator(`/job/${cell.row.original}`,{state:{data:cell.row.original}})
                        }} children={cell.value} />
                    )
                }
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: (cell) => {
                    return (
                        <StatusOptions cell={cell} />
                    )
                }
            },
            {
                Header: "Creation Date",
                accessor: "date",
            },
            {
                Header: "Client",
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