import React from "react"
import Table from "./table";
import UploadFile from "./upload";
import HeaderInfo from "./header";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function Dashboard() {
    const classes = useStyles();
    const [refresh, setRefreshData] = React.useState(false);

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

    const setRefresh = (value) => {
        setRefreshData(value)
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}><HeaderInfo /></Paper>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={getTemplateFile}>Template File</Button>
                </Grid>
                <Grid item xs={12}>
                    <UploadFile setRefresh={setRefresh} />
                </Grid>
                <Grid item xs={12}>
                    <Table refresh={refresh} setRefresh={setRefresh} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard;