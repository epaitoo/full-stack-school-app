'use strict';

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type:  DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: {
          msg: "Please Provide a value for Course title"
        },
        notNull: {
          msg: "Course title is required"
        }, 
      }
    },
   
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate : {
        notEmpty: {
          msg: "Please Provide a value for Course description"
        },
        notNull: {
          msg: "Course description is required"
        }, 
      }
    },
    
    estimatedTime: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    
    materialsNeeded: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  });

  Course.associate = (models) => {
    // TODO Add associations.
    Course.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      }
    });
  };

  return Course;
};
