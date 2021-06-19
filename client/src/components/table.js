import React from "react"
import { DataGrid } from "@material-ui/data-grid";

function Table() {

    const [columnData, setColumnData] = React.useState(null);
    const [rowData, setRowData] = React.useState(null);

    React.useEffect(() => {
        if (!columnData)
            fetch("/api/metaData")
                .then((res) => res.json())
                .then((data) => setColumnData(data))
        if (!rowData)
            fetch("/api/data")
                .then((res) => res.json())
                .then((data) => setRowData(data))
    })

    return (
        <div className="table" style={{ height: 400, width: "100%" }}>
            {
                (columnData && rowData) ? <DataGrid
                    rows={rowData}
                    columns={columnData}
                    pageSize={5}
                    pagination
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                    disableSelectionOnClick
                    sortModel={[
                        {
                            field: 'id',
                            sort: 'asc',
                        },
                    ]}

                /> : "Loading ..."}
        </div>
    )
}

export default Table;