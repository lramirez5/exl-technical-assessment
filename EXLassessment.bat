@ECHO OFF
sc start MySQL
start cmd /c java -jar employee-search-backend\target\employee-search-backend-1.0.0.jar
npm start --prefix employee-search-frontend
@ECHO ON

