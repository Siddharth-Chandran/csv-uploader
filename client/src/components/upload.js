import React, { useState } from "react";
import axios from "axios";

function UploadFile() {

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        await axios.post("/api/upload", formData
        ).then(res => console.log(res))
        .catch(error => alert(error.response.data.message));
    };

    return (
        <div>
            <input type="file" onChange={saveFile} />
            <button onClick={uploadFile}>Upload</button>
        </div>
    )
}

export default UploadFile;