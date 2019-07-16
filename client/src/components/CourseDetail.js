import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

export default class CourseDetail extends Component {

  state = {
    course : []
  }

  componentDidMount() {
    const { match: { params } } = this.props;
  
    axios.get(`/api/courses/${params.id}`)
      .then(({ data: course }) => {
        this.setState({ course });
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
            <div className="grid-100"><span><Link className="button" to="/courses/:id/update">Update Course</Link>
              <button className="button" onClick={this.deleteCourse}>Delete Course</button></span>
              <Link className="button button-secondary" to="/">Return to List</Link>
              </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
              <p>By Joe Smith</p>
            </div>
            <div className="course--description">
              <p>{course.description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <li>{course.materialsNeeded}</li>
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

