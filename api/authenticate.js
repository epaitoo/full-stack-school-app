const express = require('express');
const dbModule = require('./db')
const models = dbModule.models;
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

const { User } = models;


const authenticateUser = (req, res, next ) => {
    // Parse the user's credentials from the Authorization header.
    const credentials = auth(req);
  
    if (credentials) {
      // retrieve the user from the data store by their email Address 
      // (i.e. the user's "key" from the Authorization header).
      User.findOne({
          where : {
            emailAddress : credentials.name
          }
        }).then(user => {
            // if user is found compare password "key" 
          if (user) {
            const authenticated = bcryptjs.compareSync(credentials.pass, user.password);
            // if authenricate store user in the variable
            // so any middleware functions that follow this middleware function
            // will have access to the user's information.
            if (authenticated || credentials.pass === user.password ) {
              console.log(`Authentication successful for user with email Address: ${user.emailAddress}`);
               users = user;
              //  console.log(users);
               next();
            } else {
              console.log(`Authentication failure for user with email Address: ${user.emailAddress}`);
              res.status(401).json({ message: 'Access Denied' });
            } 
          } else {
            console.log( `User not found with email Address: ${credentials.name}`);
            res.status(401).json({ message: 'Access Denied' });
          }   
        })
      } else {
        console.log('Auth header not found');
        res.status(401).json({ message: 'Access Denied' });
      }
  }

  module.exports = authenticateUser
  