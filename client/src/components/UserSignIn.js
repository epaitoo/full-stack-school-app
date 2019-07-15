import React, { Component } from 'react';

import Form from './Form';

export default class UserSignIn extends Component {

  state = {
    emailAddress: '',
    password: ''
     //errors: []
  }

  render() {

    const { emailAddress, password } = this.state

    change = (e) => {
      
    }
  
    submit = () => {
  
    }
  
    cancel = () => {
      
    }

    return(
      <div class="bounds">
        <div class="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <Form 
              submit={this.submit}
              cancel={this.cancel}
              submitButtonText="Sign In"
              elements={() => (
                <React.Fragment>
                  <input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="text" 
                    onChange={this.change}
                    placeholder="Email Address" 
                    value={emailAddress} />
                  <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    onChange={this.change}
                    placeholder="Password" 
                    value={password} />
                </React.Fragment>
              )}/>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
        </div>
      </div>
    ); 
  }


}

