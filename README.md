# Employee Search App
Submission by Lorenzo Ramirez for EXL Software Developer Technical Assessment

## Setup
Requires [MySQL](https://www.mysql.com/downloads/) and [Node.js](https://nodejs.org/en/download/).

Prior to launching the application please create a database with the name **employee_management_system**.
```bash
create database employee_management_system
```
Please create a user so the application may access the database with **username: exlbackend** and **password: exlbackend**.
Otherwise the username, password, and database name used by the app can be changed by updating employee-search-backend/src/main/resources/**application.properties**.

Please navigate to employee-search-frontend folder and install packages with the following commands:
```bash
npm install bootstrap --save
npm add axios
npm install react-router-dom
```

If the employee-search-backend needs to be rebuilt [Maven](https://maven.apache.org/download.cgi) is required.
Navigate to employee-search-backend folder and execute:
```bash
mvn clean package
```

## Running the project
Development and testing was completed in Windows and I've included **EXLassessment.bat**. Opening a command prompt window as administrator and executing the batch file will launch:
 - MySQL service
   - The service can also be started by opening the Windows Services app and starting MySQL from there
 - Spring backend
   - The executable employee-search-backend-1.0.0.jar file is located in the employee-search-backend/target folder. To run this without the batch file, navigate to the folder and run: ```java -jar employee-search-backend-1.0.0.jar```
 - React frontend
   - To run this without the batch file, navigate to employee-search-frontend folder and run: ```npm start```


On success, the application can be viewed at [http://localhost:3000](http://localhost:3000)
