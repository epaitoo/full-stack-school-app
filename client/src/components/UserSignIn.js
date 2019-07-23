import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Form from './Form';


export default class UserSignIn extends Component {

  state = {
    emailAddress: '',
    password: '',
    errors: []
  }

  

  render() {

    const { emailAddress, password, errors } = this.state;
    

    return(
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <Form 
              submit={this.submit}
              cancel={this.cancel}
              errors={errors}
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
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
    ); 
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { emailAddress, password } = this.state;

    
    const { context } = this.props
    context.actions.signIn(emailAddress, password) 
     .then(user => {
       if (user === null ) {
        this.setState(() => {
          return {errors: ['Sign-in was unsuccessful']};
        })
       } else {
         this.props.history.push('/');
         console.log(`SUCCESS! ${emailAddress} is now signed in!, ${password}`);
       }
     })
     .catch(err => {
        console.log(err)
        this.props.history.push('/error');
     })

    

  }

  cancel = () => {
    this.props.history.push('/');
  }

  

}

