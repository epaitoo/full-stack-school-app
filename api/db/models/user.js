'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg: "Please Provide a value for first name"
        },
        notNull: {
          msg: "first name is required"
        }, 
      }
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg: "Please Provide a value for last name"
        },
        notNull: {
          msg: "Last name is required"
        }, 
      }
    },

    emailAddress: {
      type: DataTypes.STRING,
      allowNull:false,
       unique: {args: true, msg: 'email address already exist'},
      validate: {
        notEmpty: {
          msg: "Please Provide a value for email address"
        },
        isEmail: {
          msg: "Enter a valid email adress"
        },
        notNull:{
          msg: "email address is required"
        }, 
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg: "Please Provide a value for Password"
        },
        notNull: {
          msg: "Password is required"
        }, 
      }
    }
  
  });

  User.associate = (models) => {
    // TODO Add associations.
    User.hasMany(models.Course, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      }
    });
  };

  return User;
};
