import React, { Component } from 'react';


import Form from './Form';
import axios from 'axios';

export default class UpdateCourse extends Component {

  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    course: [],
    courseUser : [],
    errors: [],
  }

  componentDidMount() {
    const { match: { params } } = this.props;
  
    axios.get(`/api/courses/${params.id}`)
      .then(({ data: course }) => {
        this.setState({ title: course.title, 
                      description:course.description,
                      estimatedTime: course.estimatedTime,
                      materialsNeeded: course.materialsNeeded,
                      course,
                      courseUser : course.User
                     });
      })
      .catch((err) => {
        console.log(err)
      })

  }
  

 
  render() {
    
    const { title, description, estimatedTime, materialsNeeded, courseUser, errors } = this.state


    return(
      <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
        <Form 
          submit={this.submit}
          cancel={this.cancel}
          submitButtonText="Update Course"
          errors={errors}
          elements={() => (
            <React.Fragment>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div>
                    <input 
                      id="title" 
                      name="title" 
                      type="text" className="input-title course--title--input" 
                      placeholder="Course title..."
                      onChange={this.change}
                      value={title} />
                  </div>
                  <p>By {courseUser.firstName} {courseUser.lastName}</p>
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
                          type="text" className="course--time--input"
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
                          onChange={this.change}
                          className="" placeholder="List materials..."
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
    );
  }


  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name] : value
      }
    })
  }


  submit = () => {
    const {title, description, estimatedTime, materialsNeeded, course} = this.state;
    const { context } = this.props;

    const authUser = context.authenticatedUser;
    const emailAddress = authUser.emailAddress;
    const password = authUser.password

    const courseData = {
      title,
      description,
      estimatedTime,
      materialsNeeded
    }

    const { match: { params } } = this.props;
    axios.put(`/api/courses/${params.id}`, courseData, {
      auth : {
        username: emailAddress,
        password,
      }
    })
      .then(() => {
        this.props.history.push(`/courses/${course.id}`);
        console.log('course is succesfully updated')
      })
      .catch((err) => {
        const errors = err.response.data.errors;
        this.setState({ errors })
      })

  }

  cancel = () => {
    this.props.history.push('/');
  }

}