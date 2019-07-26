import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Form from './Form';

export default class UserSignUp extends Component {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: []
  }

  render() {
    const { firstName, lastName, emailAddress, 
          password, confirmPassword, errors } = this.state

    return (
      <div>
         <div className="bounds">
          <div className="grid-33 centered signin">
            <h1>Sign Up</h1>
            <div>
              <Form 
                submit={this.submit}
                cancel={this.cancel}
                submitButtonText="Sign Up"
                errors={errors}
                elements={() => (
                  <React.Fragment>
                    <input 
                      id="firstName" 
                      name="firstName" 
                      type="text" className="" 
                      onChange={this.change}
                      placeholder="First Name" 
                      value={firstName}/>
                    <input 
                      id="lastName" 
                      name="lastName" 
                      type="text" 
                      className="" 
                      onChange={this.change}
                      placeholder="Last Name" 
                      value={lastName}/>
                    <input 
                      id="emailAddress" 
                      name="emailAddress" 
                      type="text" 
                      className=""
                      onChange={this.change}
                      placeholder="Email Address" 
                      value={emailAddress}/>
                    <input 
                      id="password" 
                      name="password" 
                      type="password" 
                      className="" 
                      onChange={this.change}
                      placeholder="Password" 
                      value={password}/>
                    <input 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      type="password" 
                      className=""
                      onChange={this.change}
                      placeholder="Confirm Password"
                      value={confirmPassword}/>
                  </React.Fragment>
                  
                )}/>  
            </div>
            <p>&nbsp;</p>
            <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
          </div>
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
    
    const { context } = this.props;

    const { firstName, lastName, emailAddress, 
      password, confirmPassword} = this.state;

      

    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };

    if (password !== confirmPassword) {
      alert("Passwords don't match");
    } else {
      // make API call
      context.data.createUser(user)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors }); 
        }  else {
            context.actions.signIn(emailAddress, password)
              .then(() => {
                this.props.history.push('/');    
              })
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/notfound'); 
      })
    }
  }

  cancel = () => {
    this.props.history.push('/');
  }

}

