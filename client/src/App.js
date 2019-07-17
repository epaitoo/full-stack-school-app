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

// subscribe components to context changes
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);

export default ()  => (
  
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={Courses} />
        <Route path="/courses/create" component={CreateCourse} />
        <Route path="/courses/:id" component={CourseDetail}/>
        <Route path="/courses/:id/update" component={UpdateCourse}/>
        <Route path="/signin" component={UserSignInWithContext}/>
        <Route path="/signup" component={UserSignUpWithContext}/>
        <Route path="/signout" component={UserSignOut}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  </Router>
 
);



