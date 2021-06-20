import React, { useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import AlertDialog from "./alert";
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

function UploadFile(props) {
    const classes = useStyles();

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [open, setOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");

    const handleClose = () => {
        setOpen(false);
        setAlertMessage("");
    };

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        await axios.post("/api/upload", formData)
            .then(res => {
                setAlertMessage(res.data.message);
                setOpen(true);
                refreshData();
            })
            .catch(error => {
                setAlertMessage(error.response.data.message);
                setOpen(true);
            });
    };

    const refreshData = () => {
        props.setRefresh(true);
    }

    const resetData = async () => {
        await axios.post("/api/reset")
            .then(res => {
                setAlertMessage(res.data.message);
                setOpen(true);
                refreshData();
            })
            .catch(error => {
                setAlertMessage(error.response.data.message);
                setOpen(true);
            });
    }

    return (
        <div>
            <input type="file" onChange={saveFile} />
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                onClick={uploadFile}
            >
                Upload
            </Button>
            {/* <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={refreshData}
            >
                Refresh
            </Button> */}
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={resetData}
            >
                Reset
            </Button>
            <AlertDialog open={open} handleClose={handleClose} alertMessage={alertMessage} />
        </div>
    )
}

export default UploadFile;