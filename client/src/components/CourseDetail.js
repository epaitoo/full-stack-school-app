import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import axios from 'axios';

export default class CourseDetail extends Component {

  state = {
    course : [],
    courseUser: []
  }

  componentDidMount() {
    const { match: { params } } = this.props;
  
    axios.get(`/api/courses/${params.id}`)
      .then(({ data: course }) => {
        this.setState({ course, courseUser: course.User });
      })
      .catch((err) => {
        console.log(err)
      })

  }


   deleteCourse = () => {
    const id = this.props.match.params.id
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    const emailAddress = authUser.emailAddress;
    const password = authUser.password


    axios.delete(`/api/courses/${id}`, {
      auth: {
        username: emailAddress,
        password
      }
    })
      .then(() => {
        this.props.history.push(`/`)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  

  render() {

    const { course, courseUser } = this.state;
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    

    return(
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              { authUser !== null && authUser.id === course.userId &&
                <span>
                  <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                  <button className="button" onClick={this.deleteCourse}>Delete Course</button>
                </span>
              }
              <Link className="button button-secondary" to="/">Return to List</Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
              <p>By {courseUser.firstName} {courseUser.lastName}</p>
            </div>
            <ReactMarkdown className="course--description" source={course.description} />
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
                  <ReactMarkdown source={course.materialsNeeded} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

