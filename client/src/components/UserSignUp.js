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
    type: 'password',
    errors: []
  }

   // shows / hide password input onClick
  // by setting the type of input from 'input' or 'password'
  showHide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === 'password' ? 'input' : 'password'
    })  
  }

  render() {
    const { firstName, lastName, emailAddress, 
          password, confirmPassword,  type, errors } = this.state

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
                      type={type} 
                      className="" 
                      onChange={this.change}
                      placeholder="Password" 
                      value={password}/>
                      <span className="show" 
                        onClick={this.showHide}>{this.state.type === 'password' ? 'Show' : 'Hide'}
                    </span>
                    <input 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      type={type} 
                      className=""
                      onChange={this.change}
                      placeholder="Confirm Password"
                      value={confirmPassword}/>
                      <span className="show" 
                        onClick={this.showHide}>{this.state.type === 'password' ? 'Show' : 'Hide'}
                    </span>
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

  // sets the state to the input value on change
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  //Sign up a new User on submit
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
      // imports the createUser() method defined in Data.js
      // accessed via the destructured context variable to sign up a user
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

  // cancels and return the user to the homepage
  cancel = () => {
    this.props.history.push('/');
  }

}

