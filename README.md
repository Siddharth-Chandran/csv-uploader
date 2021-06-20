# CSV Uploader

The project is used to view CSV files of a given tempalte from anywhere. User can upload a CSV file based on the template, reset it, and upload a new one if needed. The data is not lost between all browser and system windows. 

## Pre-Requests
* [NodeJS](https://nodejs.org/en/)
* [ReactJS](https://reactjs.org/)
* [Git](https://git-scm.com/) or any version control installed in system
* An account in for deployment [Heroku](https://heroku.com/)

## Setup
1. Clone the attached git repository.
2. Execute the below to download all npm dependencies.
```bash
cd ~/csv-uploader
#To install all server related dependencies
npm install

#To install all client related dependencies
cd client
npm install
```
3. To create a production build, you can run the below command
```bash
cd ~/csv-uploader
npm run build

# It invokes the build command mentioned in package.json, which internally calls: cd client && npm install && npm run build
```

## Docket Image Creation
Run the below commands to create a docker image and run:
```bash
# Note: The below commands are for the user: sid5794 and repository: csv-uploader
docker build -t sid5794/csv-uploader .

docker run -d -p 3001:3001 --name csv-uploader-run sid5794/csv-uploader
```

## Architecture

The server and client components has been kept in a single directory for ease of development. The components are also packaged together and deployed in the same server for ease. 

### Client
The Client component has been build using ReactJS. The dashboard lets you:
* Download a template file, which contains the CSV format.
* Upload a completed CSV file.
* Reset the data if needed.

### Server
The server component is build using NodeJS. The server:
* Hosts the ReactJS component using ExpresJS.
* Has API exposed to:
    
    * Upload - Upload a finished document
    * Download - A template file
    * Reset - Reset the existing table data
    * Metadata - To expose the table header metadata

* The server also checks the health on the CSV file. It checks whether the file uploaded has all necessary header files and is in the format of the template provided. The schema check is as below:

    ```json
    {
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
    ```

## FAQ

1. How do you store the data as of now?<br/>
Ans) The CSV file is currently stored in the backened server. It will be only saved if it matches the template file.
2. Can anyone update the dashboard as of now?<br/>
Ans) Yes. Since there is no authentication provided, anyone can update the dashboard and upload a csv of their choice.

## Future Enhancements
* Login Page
* Handle multiple CSV files of different template
* Saving the data in a database