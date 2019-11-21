'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.FLOAT
    },
    link: {
      type: DataTypes.STRING
    },
    collectionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsTo(models.Collection, {
      foreignKey: 'collectionId',
      onDelete: "CASCADE"
    });
  };
  return Item;
};