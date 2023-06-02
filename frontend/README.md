# Todo Application

The TODO App is a MERN stack application that allows users to manage their tasks. It consists of a backend built with Node.js and Express, a frontend built with React, and it is deployed as Docker containers on Azure. The application provides a user-friendly interface to create, update, and delete tasks, helping users stay organized and productive.

## Live demo: http://52.147.197.64:3000/
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

 
## Installation

To run the TODO App locally, follow these steps:

1. Clone the repository:
   ```shell
   git clone https://github.com/Tanveerhusyn/todo.git
   
2. Navigate to the project directory:
   ```shell
   cd backend
   npm install
4. Install the dependencies for the frontend:
   ```shell
   cd frontend
   npm install
## USAGE
To start the TODO App, run the following command in the root directory:
   ```shell
   cd frontend
   npm start
  
   cd backend
   npm start 
  
   ```
 Alternatively, you can also run it on Docker. Make sure you have Docker and Docker Compose installed on your system. Then, run the following command in the root directory:
   ```shell
   sudo docker-compose up
   ```
## Testing
![Testing image](testing.jpeg)

The TODO App uses Cypress for end-to-end testing. To run the tests, ensure that the application is running locally and then execute the following command:
   ```shell
   npx cypress open
   ```


## Contributing
Contributions to the TODO App are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request. Make sure to follow the existing coding style and include appropriate test coverage.