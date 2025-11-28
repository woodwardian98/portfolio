'use strict';
const {
  Model
} = require('sequelize');

// In Node.js, classes are not private in the same way as in other languages.
// Sequelize models are designed to be classes that are exported from their modules
// and used throughout the application for database interactions. Making the class
// "private" would prevent it from being used outside of this file, which would
// defeat the purpose of a model. We follow the standard practice of exporting the
// model class.
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};