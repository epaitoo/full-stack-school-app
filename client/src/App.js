import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';


import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

// subscribe components to context changes
const HeaderWithContext = withContext(Header);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

export default ()  => (
  
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={Courses} />
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourse}/>
        <Route path="/courses/:id" component={CourseDetailWithContext}/>
        <Route path="/signin" component={UserSignInWithContext}/>
        <Route path="/signup" component={UserSignUpWithContext}/>
        <Route path="/signout" component={UserSignOutWithContext}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  </Router>
 
);



