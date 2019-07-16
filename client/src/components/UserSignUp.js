import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Form from './Form';

export default class UserSignUp extends Component {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: ''
    //errors: []
  }

  render() {
    const { firstName, lastName, emailAddress, password } = this.state

    return (
      <div>
         <div class="bounds">
          <div class="grid-33 centered signin">
            <h1>Sign Up</h1>
            <div>
              <Form 
                submit={this.submit}
                cancel={this.cancel}
                submitButtonText="Sign Up"
                elements={() => (
                  <React.Fragment>
                    <input 
                      id="firstName" 
                      name="firstName" 
                      type="text" class="" 
                      placeholder="First Name" 
                      value={firstName}/>
                    <input 
                      id="lastName" 
                      name="lastName" 
                      type="text" 
                      class="" 
                      placeholder="Last Name" 
                      value={lastName}/>
                    <input 
                      id="emailAddress" 
                      name="emailAddress" 
                      type="text" 
                      class="" 
                      placeholder="Email Address" 
                      value={emailAddress}/>
                    <input 
                      id="password" 
                      name="password" 
                      type="password" 
                      class="" 
                      placeholder="Password" 
                      value=""/>
                    <input 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      type="password" 
                      class="" 
                      placeholder="Confirm Password"
                      value={password}/>
                  </React.Fragment>
                  
                )}/>  
            </div>
            <p>&nbsp;</p>
            <p>Already have a user account? <Link href="/signin">Click here</Link> to sign in!</p>
          </div>
        </div>
      </div>
    );
  }

  cancel = () => {
    this.props.history.push('/');
  }

}

