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
      allowNull: false,
      defaultValue: false,
      type: DataTypes.STRING
    },
    owned: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
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

    Item.addScope('itemsFor', (collectionId) => {
       return {
         include: [{
           model: models.Collection,
           as: "Collection"
         }],
         where: { collectionId: collectionId },
         order: [['createdAt', 'ASC']]
       }
    });
  };
  return Item;
};