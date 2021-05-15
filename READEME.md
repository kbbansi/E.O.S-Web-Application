# E.O.S Web Application

E.O.S Web Application is an E-commerce web app for kente apparel

## Installation
The applicatio is developed mainly as a ```Javascript``` project using:
- Node.js - Backend
- Angular - Admin Application
- React - Website

To install and run the application:

- Clone the [repo](https://github.com/kbbansi/E.O.S-Web-Application.git)
- Download and install [Node.js](https://nodejs.org/en/)
- Navigate to the location of the cloned repo using the terminal or command prompt
- Within each application, run 

```bash
npm install
```

## Usage
To start the Admin application, 
- Run the following command in the e.o.s-admin-app folder
```bash
npm start
```
In your browser, navigate to **localhost:4200** to see your running application

To start the Backend application, 
- Import the **application.sql** script into a MySQL or MariaDb instance of your choice
- Change the database credentials to match your local credentials
- Run the following command in the e.o.s-backend folder
```bash
npx nodemon bin/www
```
- Confirm that database was successfully setup and is connected to the application

To start the Website,
- Run the following command in the e.o.s-website folder
```bash
npm start
```
In your browser, navigate to **localhost:3000** to see your running application
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)