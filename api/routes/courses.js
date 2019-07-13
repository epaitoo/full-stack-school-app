const express = require('express');
const router = express.Router();
const dbModule = require('../db');
const models = dbModule.models;

const authenticateUser = require('../authenticate');
const { Course, User } = models;


// Returns a list of courses (including the user that owns each course)
router.get('/', (req, res) => {
  Course.findAll({
    include : [
      {
        model : User,
        as: 'User',
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  }).then((course) => {
    res.json(course);
  });
});

// - Returns a the course (including the user that owns the course) for the provided course ID
router.get('/:id', (req, res, next) => {
  Course.findByPk(req.params.id, {
    include : [
      {
        model : User,
        as: 'User',
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  })
    .then((course) => {
      if (course) {
        res.json(course);
      } else {
        res.status(404).json({message: "Course not found"});
      }
    }).catch((err) => {
      return next(err);
    })
})

// - Creates a course and sets the Location header to the URI for the course
router.post('/', authenticateUser,(req, res, next) => {
  
  const course = req.body
  Course.create(course)
    .then((data) => {
      res.location(`/api/courses/${data.id}`);
      res.status(201).end()
    }).catch((err) => {
      err.status = 400;
      return next(err);
  }) 

});

// Updates a course and returns no content
router.put('/:id', authenticateUser, (req, res, next) => {
  Course.findByPk(req.params.id)
    .then((course) => {
      if (course) {
        return course.update(req.body)
      } else {
        res.status(404).json({message: "Course not found"});
      }
  }).then(() => {
    res.status(204).end()
  }).catch((err) => {
    if (err.name === "SequelizeValidationError") {
      res.status(400).json({error: err.message})
    } else {
      throw err;
    }
  })
  .catch((err) => {
    return next(err);
  }) 
    
})

// Deletes a course and returns no content
router.delete('/:id', authenticateUser, (req, res, next) => {
  Course.findByPk(req.params.id)
    .then((course) => {
      if (course) {
        return course.destroy();
      } else {
        res.status(404).json({message: "Course not found"});
      }
    }).then(() => {
      res.status(204).end()
    }).catch((err) => {
      return next(err);
    })
})







module.exports = router