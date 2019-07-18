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
                      <p>By Joe Smith</p>
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

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name] : value
      }
    })
  }

  submit = () => {
    const {title, description, estimatedTime, materialsNeeded} = this.state;
    const { context } = this.props;

    const authUser = context.authenticatedUser;
    const emailAddress = authUser.emailAddress
    const password = authUser.password
    // const credentials = btoa(`${emailAddress}:${password}`)
    // const basicAuth = `Basic ${credentials}`;
    console.log(password)
    

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded
    }

    context.data.createCourse(course, emailAddress, password)
      .then(res => {
        console.log(res);
      })
      .then(errors => {
        if (errors.length) {
          this.setState({ errors }); 
        }
      })
      .catch((err) => {
        console.log(err)
        this.props.history.push('/error'); 
      })
  }

  cancel= () => {
    this.props.history.push('/');
  }



}