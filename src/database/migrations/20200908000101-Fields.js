'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Fields', { 
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      farm_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Farms', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      coordinates: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Fields');
  }
};