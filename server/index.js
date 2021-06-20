
const express = require("express");
const fileupload = require("express-fileupload");
const csv = require('csvtojson')
const validate = require('jsonschema').validate;
const fs = require("fs");
const path = require("path");
const metaData = require("./metadata");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(fileupload());
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from Sid!" });
});

app.get("/api/metaData", (req, res) => {
    res.json(metaData.columns);
})


app.post("/api/upload", (req, res) => {
    if (req.files == null) { res.status(404).send({ message: "Chose a file!", code: 404 }); return; }
    const newpath = __dirname + "/files/";
    const file = req.files.file;
    const filename = "tempUploadCSV.csv";
    const backupFile = "UploadCSV.csv";

    file.mv(`${newpath}${filename}`, (err) => {
        if (err) {
            res.status(500).send({ message: "File upload failed", code: 200 });
        } else {
            const jsonArray = csv({ colParser: metaData.columnParser, checkType: true }).fromFile(`${newpath}${filename}`)
            jsonArray.then(json => {
                var result = validate(json, metaData.schema)
                if (!result.valid) res.status(500).send({ message: "Data provided doesnt match the template file." + 
                "Check if header data is wrong. It could be that user uploaded a string value in numeric column.", code: 500 });
                else {
                    file.mv(`${newpath}${backupFile}`)
                    res.status(200).send({ message: "File Uploaded Sucessfully", code: 200 });
                }
            })
        }
    });
});


app.get("/api/data", (req, res) => {
    try {
        const filePath = __dirname + "/files/UploadCSV.csv"
        if (!fs.existsSync(filePath)) {
            res.json([]);
            return;
        }
        const jsonArray = csv().fromFile(filePath)
        jsonArray.then(json => {
            res.json(json);
            return;
        })
    } catch (err) {
        res.json([]);
        return;
    }
});

app.post("/api/reset", (req, res) => {
    try {
        const filePath = __dirname + "/files/UploadCSV.csv"
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }
        res.status(200).send({ message: "Table data has been reset.", code: 200 });
    } catch (err) {
        res.status(500).send({ message: "Couldnt reset CSV data: " + err.message, code: 500 });
    }
});

app.get('/api/templateFile', function (req, res) {
    var data = '"Name", "Age", "Manager", "Salary", "Department", "Company"'
    res.setHeader('Content-disposition', 'attachment; filename=UserTemplateFile.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(data);
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});