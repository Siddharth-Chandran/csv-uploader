const columns = [
    { field: "id", headerName: "ID", width: 90, type: "number" },
    {
        field: "name",
        headerName: "Name",
        flex: 0.5,
    },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        flex: 0.5,
    },
    {
        field: "manager",
        headerName: "Manager",
        flex: 1,
    },
    {
        field: "salary",
        headerName: "Salary",
        type: "number",
        flex: 1,
    }, {
        field: "department",
        headerName: "Department",
        flex: 1,
    }, {
        field: "company",
        headerName: "Company",
        flex: 1,
    },
];

const schema = {
    "type": "array",
    "items": {
        "properties": {
            "id": { "type": "integer" },
            "name": { "type": "string" },
            "age": { "type": "integer" },
            "manager": { "type": "string" },
            "salary": { "type": "integer" },
            "department": { "type": "string" },
            "company": { "type": "string" }
        },
        "required": ["id", "name", "age", "salary", "company"]
    }
}

const columnParser = {
    "column1": "number",
    "column2": "string",
    "column3": "number",
    "column4": "string",
    "column5": "number",
    "column6": "string",
    "column7": "string",
}

module.exports = {
    columns, schema, columnParser
}