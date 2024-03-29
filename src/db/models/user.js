'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: { 
      type: DataTypes.STRING,
      allowNull: false, 
    },
    email: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {msg: "Must be a valid email"}
      }
    },
    password: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "standard"
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Collection, {
      foreignKey: 'userId',
      as: "collections"
    });
  };

  User.prototype.isAdmin = function() {
    return this.role === "admin";
  };  

  User.prototype.isStandard = function() {
    return this.role === "standard";
  };  

  User.prototype.isPremium = function() {
    return this.role === "premium";
  };
  return User;
};