# Full Stack School App

This app uses React to create a client for an [existing school database REST API](https://github.com/epaitoo/school-restapi)
This is a full stack application that provides a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, viewing detail for a specific course, as well as creating, updating and deleting courses in the database. In addition, users are required to create an account and sign in to make changes to the database.

## How it works
* Project is set up using create-react-app
*	The React project's folder is named client
*	The REST API project's folder is named api and has been updated with support for Cross-Origin Resource Sharing (CORS) using [CORS npm package](https://www.npmjs.com/package/cors)
*	The app contains the following stateful class components:
  *	Courses - The component retrieves the list of courses from the REST API, renders a list of courses, links each course to its      respective "Course Detail" screen, and renders a link to the "Create Course" screen
  *	CourseDetail - The component retrieves the detail for a course from the REST API, renders the course details, an "Update Course" button for navigating to the "Update Course" screen, and a "Delete Course" button that when clicked sends a DELETE request to the REST API to delete a course
  *	UserSignIn - The component renders a form allowing the user to sign using their existing account information, a "Sign In" button that when clicked signs in the user, and a "Cancel" button that returns the user to the default route (i.e. the list of courses)
  *	UserSignUp - The component renders a form allowing a user to sign up by creating a new account, a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user, and a "Cancel" button that returns the user to the default route (i.e. the list of courses)
  *	CreateCourse - The component renders a form allowing a user to create a new course, a "Create Course" button that when clicked sends a POST request to the REST API's /api/courses route, and a "Cancel" button that returns the user to the default route (i.e. the list of courses)
  *	UpdateCourse - The component renders a form allowing a user to update one of their existing courses, an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route, and a "Cancel" button that returns the user to the "Course Detail" screen
  
*	The app contains the following stateless functional components:
  *	Header- The component renders the top menu bar and buttons for signing in and signing up (if there's not an authenticated user) or the user's first and last name and a button for signing out (if there's an authenticated user)
  *	UserSignOut - The component signs out the authenticated user and redirects the user to the default route (i.e. the list of courses)
  
*	The react-router-dom npm package is installed and listed as a dependency in the package.json file  
  *	The following routes are configured (listed in the format path - component): / - Courses, /courses/create - CreateCourse, /courses/:id/update - UpdateCourse, /courses/:id - CourseDetail, /signin - UserSignIn, /signup - UserSignUp, /signout - UserSignOut
*	The app's global state is managed using the React Context API in client/Context.js
*	A signIn() method is globally available that: authenticates a user using their email address and password, persists the authenticated user's information (including their password) in the global state
*	A signOut() method is globally available that removes the authenticated user's information (including their password) from the global state
*	The app contains a higher-order component (HOC) named PrivateRoute that is used to configure protected routes (i.e. routes that require authentication)
*	The following routes are configured using the PrivateRoute component: /courses/create, /courses/:id/update
*	The CourseDetail component only renders the "Update Course" and "Delete Course" buttons if: there's an authenticated user, the authenticated user's ID matches that of the user who owns the course
*	The "Sign Up", "Create Course", and "Update Course" screens display validation errors returned from the REST API
*	The "Course Detail" screen renders the course description and materialsNeeded properties as markdown formatted text
* The app persists user credentials using an HTTP cookie or local storage so that the user's authenticated state is maintained even if the application is reloaded or loaded into a new browser tab

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

* Click on the 'Clone or download' button and select 'Download Zip.'

* Move to the /api folder and run `npm install` to install the dependacies

* Open a new terminal and move to the /client folder and `npm install` to install the dependacies

* In the /api folder run `npm run seed` and run `npm start` to start the server on http://localhost:5000

* In the /client folder run `npm start` to start the app on http://localhost:3000 in the browser



