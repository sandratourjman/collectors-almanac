'use strict';
module.exports = (sequelize, DataTypes) => {
  var Collection = sequelize.define('Collection', {
    title: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    category: {
    	allowNull: false,
    	type: DataTypes.STRING
    },
    private: {
    	allowNull: false,
      defaultValue: false,
    	type: DataTypes.BOOLEAN
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    }
  }, {});
  Collection.associate = function(models) {
    // associations can be defined here
    Collection.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Collection.hasMany(models.Item, {
    	foreignKey: 'collectionId',
    	as: 'items'
    });

    Collection.addScope('collectionFor', (itemId) => {
       return {
         include: [{
           model: models.Item
         }],
         where: { itemId: itemId },
         order: [['createdAt', 'ASC']]
       }
    });
    
  };
  return Collection;
};