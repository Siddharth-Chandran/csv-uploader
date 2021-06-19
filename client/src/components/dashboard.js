import React from "react"
import Table from "./table";
import { Button } from "@material-ui/core";

function Dashboard() {

    function getTemplateFile() {
        fetch('/api/templateFile')
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'UserTemplateFile.csv');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
    }

    return (
        <div>
            <div>
                <Button variant="contained" color="primary" onClick={getTemplateFile}>Template File</Button>
            </div>
            <br/>
            <div><Table /></div>
        </div>
    )
}

export default Dashboard;