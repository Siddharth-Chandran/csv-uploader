import React from "react"
import { DataGrid } from "@material-ui/data-grid";
import LoadingBar from "./progressBar";

function Table(props) {

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

    React.useEffect(() => {
        if (props.refresh) {
            fetch("/api/data")
                .then((res) => res.json())
                .then((data) => setRowData(data))
        }
        props.setRefresh(false)
    })


    return (
        <div className="table" style={{ height: 600, width: "96%" }}>
            {
                (columnData && rowData) ? <DataGrid
                    rows={rowData}
                    columns={columnData}
                    pagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    // pageSize={10}
                    checkboxSelection
                    disableSelectionOnClick
                    sortModel={[
                        {
                            field: 'id',
                            sort: 'asc',
                        },
                    ]}
                /> : <LoadingBar />}

        </div>
    )
}

export default Table;