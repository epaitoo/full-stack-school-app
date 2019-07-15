import React, {Component} from 'react';

import axios from 'axios';

export default class CourseDetail extends Component {

  state = {
    course : []
  }

  componentDidMount() {
    const id = this.props.match.params.id
    axios.get(`/api/courses/${id}`)
      .then((response) => {
        this.setState({ course: response.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }

   deleteCourse = () => {
    const id = this.props.match.params.id
    axios.delete(`/api/courses/${id}`)
      .then(() => {
        this.props.history.push(`/`)
      })
  }



  render() {

    const { course } = this.state;


    return(
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a>
              <a className="button" href="#" onClick={this.deleteCourse}>Delete Course</a></span><a
                className="button button-secondary" href="index.html">Return to List</a>
              </div>
          </div>
        </div>
        <div class="bounds course--detail">
          <div class="grid-66">
            <div class="course--header">
              <h4 class="course--label">Course</h4>
              <h3 class="course--title">{course.title}</h3>
              <p>By Joe Smith</p>
            </div>
            <div class="course--description">
              <p>{course.description}</p>
            </div>
          </div>
          <div class="grid-25 grid-right">
            <div class="course--stats">
              <ul class="course--stats--list">
                <li class="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime}</h3>
                </li>
                <li class="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <li>{course.materialNeeded}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

