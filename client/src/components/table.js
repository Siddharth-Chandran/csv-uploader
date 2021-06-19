import React from "react"
import { DataGrid } from "@material-ui/data-grid";

function Table() {

    const [columnData, setColumnData] = React.useState(null);

    React.useEffect(() => {
        if (!columnData)
            fetch("/api/metaData")
                .then((res) => res.json())
                .then((data) => setColumnData(data))
    })


    // id, "name", "age", "manager", "salary", "department", "company"
    const rows = [
        { id: 1, name: "Snow", manager: "Jon", age: 35 },
        { id: 2, name: "Lannister", manager: "Cersei", age: 42 },
        { id: 3, name: "Lannister", manager: "Jaime", age: 45 },
        { id: 4, name: "Stark", manager: "Arya", age: 16 },
        { id: 5, name: "Targaryen", manager: "Daenerys", age: null },
        { id: 6, name: "Melisandre", manager: null, age: 150 },
        { id: 7, name: "Clifford", manager: "Ferrara", age: 44 },
        { id: 8, name: "Frances", manager: "Rossini", age: 36 },
        { id: 9, name: "Roxie", manager: "Harvey", age: 65 }
    ];

    return (
        <div className="table" style={{ height: 400, width: "100%" }}>
            {
             columnData ? <DataGrid
                rows={rows}
                columns={columnData}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
            /> : "Loading ..."}
        </div>
    )
}

export default Table;