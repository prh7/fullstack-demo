# cars-management-system-backend
The backend for Car Management System. It contains the API endpoints for the system. 

### Technologies used
* JavaScript (programming language)
* Node.js
* NPM
* ExpressJS
* MongoDB (database)

#### Development setup
* First, please make sure that you have the latest version of node.js installed on your machine. You can download and install it from https://nodejs.org/en/download, depending on the type of operating system you are using.
* Open terminal and navigate to the root of the server directory.
* Run the install command ```npm install```.
* Run the server command ```npm run server```. The server will run and start listening for incoming API requests on port 8001.
* Thats it! You are good to go.

##### Database
The database is hosted on the cloud premises. So, the developer don't need to worry about any local installation of the database in their system.

###### REST API Endpoints
* POST v1/cars (Adds a new car)
* PUT v1/cars/:carId (Updates the data for a car, referenced by the unique identifier of the car)
* DELETE v1/cars/:carId (Deletes a car, referenced by the unique identifier of the car)
* GET v1/cars (Fetches a list of available cars)

<i>There is no autorization setup for the API endpoints that impies that the API endpoints isn't with security.</i>

<i>Note that, there is a Postman collection under the docs folder in the root directory of the project. The developer can extract the API documentation and test the endpoints. Make sure that the server is running locally and you have Postman (https://www.postman.com/downloads/) installed on your local machine. Also, use the import functionality of the Postman (https://learning.postman.com/docs/designing-and-developing-your-api/importing-an-api/) to test the endpoints.</i>
