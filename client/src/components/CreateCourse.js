import React, {Component} from 'react';

import Form from './Form';



export default class CreateCourse extends Component {

  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []
  }

  render() {
    const {title, description, estimatedTime, materialsNeeded, errors} = this.state;
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return(
      <div>
        <div className="bounds course--detail">
          <h1>Create Course</h1>
          <div>
            <Form 
              submit={this.submit}
              cancel={this.cancel}
              submitButtonText="Create Course"
              errors={errors}
              elements={() => (
                <React.Fragment>
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <div>
                        <input id="title" 
                          name="title" 
                          type="text" className="input-title course--title--input" placeholder="Course title..."
                          onChange={this.change}
                          value={title}/>
                      </div>
                      <p>By {authUser.firstName} {authUser.lastName}</p>
                    </div>
                    <div className="course--description">
                      <div>
                        <textarea 
                          id="description" 
                          name="description" 
                          className=""
                          onChange={this.change}
                          placeholder="Course description..."
                          value={description}/>
                      </div>
                    </div>
                  </div>
                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          <div>
                            <input 
                              id="estimatedTime" 
                              name="estimatedTime" 
                              type="text" 
                              className="course--time--input"
                              onChange={this.change}
                              placeholder="Hours" 
                              value={estimatedTime}/>
                          </div>
                        </li>
                        <li className="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <div>
                            <textarea 
                              id="materialsNeeded" 
                              name="materialsNeeded" 
                              className=""
                              onChange={this.change}
                              placeholder="List materials..."
                              value={materialsNeeded}/>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </React.Fragment>
              )}/>
          </div>
        </div>
      </div>
    );
  }

  // sets the state to the input value on change
  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name] : value
      }
    })
  }

  // Creates a new course on submit
  submit = () => {
    const {title, description, estimatedTime, materialsNeeded} = this.state;
    const { context } = this.props;

    const authUser = context.authenticatedUser;
    const emailAddress = authUser.emailAddress;
    const password = authUser.password
  
    
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId : authUser.id
    }

    // imports the createUser() method defined in Data.js
    // accessed via the destructured context variable to create a course
    context.data.createCourse(course, emailAddress, password)  
      .then(errors => {
        if (errors.length) {
          this.setState({ errors }); 
        }  else {
          this.props.history.push(`/`);
        }
      })
      .catch((err) => {
        console.log(err)
      }) 
  }

  // cancels and return the user to the homepage
  cancel= () => {
    this.props.history.push('/');
  }



}