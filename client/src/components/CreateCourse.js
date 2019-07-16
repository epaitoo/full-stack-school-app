import React, {Component} from 'react';

import axios from 'axios';

export default class CreateCourse extends Component {

  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    // errors: []
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name] : value
      }
    })
  }

  handleSubmit = (e) => {
    const {title, description, estimatedTime, materialsNeeded} = this.state;
    e.preventDefault();

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded
    }

    axios.post('/api/courses', {course})
      .then((res) => {
        console.log(res.data) 
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleCancel= (e) => {
    e.preventDefault()
    this.props.history.push('/');
  }

 


  render() {
    const {title, estimatedTime} = this.state;

    return(
      <div>
        <div className="bounds course--detail">
          <h1>Create Course</h1>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div>
                    <input id="title" 
                          name="title" 
                          type="text" className="input-title course--title--input" placeholder="Course title..."
                          onChange={this.handleChange}
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
                      onChange={this.handleChange}
                      placeholder="Course description..."></textarea>
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
                          onChange={this.handleChange}
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
                          onChange={this.handleChange}
                          placeholder="List materials..."></textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Create Course</button>
                <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    );
  }
}