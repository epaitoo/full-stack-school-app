import React, { Component } from 'react';

import axios from 'axios';

export default class UpdateCourse extends Component {

  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    // errors: []
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name] : value
      }
    })
  }

  submitUpdate = (e) => {
    const {title, description, estimatedTime, materialsNeeded} = this.state;
    e.preventDefault();

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded
    }

    const id = this.props.match.params.id
    axios.put(`/api/courses/${id}`, {course})
      .then((res) => {
        console.log(res.data) 
      })
      .catch((err) => {
        console.log(err)
      })
  }

  cancel = () => {
    this.props.history.push('/');
  }

  render() {
    const {title, estimatedTime} = this.state;

    return(
      <div class="bounds course--detail">
      <h1>Update Course</h1>
      <div>
        <form onSubmit={this.submitUpdate}>
          <div class="grid-66">
            <div class="course--header">
              <h4 class="course--label">Course</h4>
              <div>
                <input 
                  id="title" 
                  name="title" 
                  type="text" class="input-title course--title--input" 
                  placeholder="Course title..."
                  onChange={this.handleChange}
                  value={title} />
              </div>
              <p>By Joe Smith</p>
            </div>
            <div class="course--description">
              <div>
                <textarea 
                  id="description" 
                  name="description" 
                  class="" 
                  onChange={this.handleChange}
                  placeholder="Course description...">
                </textarea>
              </div>
            </div>
          </div>
          <div class="grid-25 grid-right">
            <div class="course--stats">
              <ul class="course--stats--list">
                <li class="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div>
                    <input 
                      id="estimatedTime" 
                      name="estimatedTime" 
                      type="text" class="course--time--input"
                      onChange={this.handleChange}
                      placeholder="Hours" 
                      value={estimatedTime}/>
                  </div>
                </li>
                <li class="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div>
                    <textarea 
                      id="materialsNeeded" 
                      name="materialsNeeded" 
                      onChange={this.handleChange}
                      class="" placeholder="List materials...">
                    </textarea>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="grid-100 pad-bottom">
            <button class="button" type="submit">Update Course</button>
            <button class="button button-secondary" onClick={this.cancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
    );
  }
}