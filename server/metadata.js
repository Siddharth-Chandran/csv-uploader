const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "name",
        headerName: "Name",
        width: 150,
        editable: true
    },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 150,
        editable: true
    },
    {
        field: "manager",
        headerName: "Manager",
        width: 150,
        editable: true
    },
    {
        field: "salary",
        headerName: "Salary",
        width: 150,
        editable: true
    }, {
        field: "department",
        headerName: "Department",
        width: 150,
        editable: true
    }, {
        field: "company",
        headerName: "Company",
        width: 150,
        editable: true
    },
];

const schema = {
    "type": "array",
    "items": {
        "properties": {
            "id": { "type": "string" },
            "name": { "type": "string" }
        },
        "required": ["id", "name"]
    }
}

module.exports = {
    columns, schema
}