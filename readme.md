## About

Courses. This project is about viewing courses, editing courses and adding new courses.
#### It has such functionality for now:  
- for User:
  - authorization
  - registration
  - view courses
  - open course page
  - logout
- for Administrator also:
  - add new courses
  - edit courses
  - delete courses
  - add new authors

#### Accounts for testing purposes:
  - Admin: 
    - login: admin@email.com
    - password: admin
  - User:
    - login: user@email.com
    - password: user

## How to Run

Enter the following commands in the console: 

`npm run start-client` - this will run the client app. \
`npm run start-server` - this will run the server on port 5000. 

## Used Technologies and Approaches

### Server app

The server app is written on **Node.js** with **Express** framework. \
\
Data is stored in **MongoDB**, but storage can be replaced by JSON
easily due to implemented architecture.\
\
**Endpoints** provided in `api.postman_collection` file.


 **The architecture** consists of:
  - Controller Layer
  - Service Layer
  - Data Access Layer

#### Patterns: 
Services are **Singletons**. \
Data Access Layer is implemented through **Repositories**. \
Repositories are meant to be injected in Service entity (**Dependency Injection**).

**Technologies**:
  - Express - used framework
  - mongoose - ORM for MongoDB
  - JWT - authorization support
  - Joi - validation of request data
  - bcrypt - encryption / decryption of passwords

### Client app

The client app is written with **React**. \
**Redux** and **Redux Thunk** are used for state control. \
**Axios** is used for making requests to the server. \
**React Bootstrap** as UI library. \
**ESLint** and **Prettier** for code styling.
