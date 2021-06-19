
const express = require("express");
const path = require("path");
const metaData = require("./metadata")

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from Sid!" });
});

app.get("/api/metaData", (req, res) => {
    console.log("Here")
    res.json(metaData.columns);
})

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