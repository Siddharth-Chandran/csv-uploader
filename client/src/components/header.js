import React from "react"
import Typography from "@material-ui/core/Typography";

export default function HeaderInfo() {
    return (
        <React.Fragment>
            <Typography variant="h1" gutterBottom>
                CSV Uploader
            </Typography>
            <Typography variant="h5" gutterBottom>
                A project made by Siddharth
            </Typography>
            <Typography variant="body1" display="block" align="justify">
                The below project can be used to view a CSV file on web. The metadata for the program can be downloaded as a "Tempalte File" below.
                On filling the template CSV, you can upload the file and view it's contents on the dashboard. The backend built in NodeJS will check whether the file uploaded is according to the template file.
                You can sort, filter and hide columns by clicking on the three dots next to column headers.
            </Typography>
            <Typography variant="body1" display="block">
                
            </Typography>

        </React.Fragment>
    )
}