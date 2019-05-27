"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Tracks", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false
      },
      duration: {
        type: Sequelize.INTEGER
      },
      spotifyId: {
        type: Sequelize.STRING
      },
      explicit: {
        type: Sequelize.BOOLEAN
      },
      href: {
        type: Sequelize.STRING
      },
      popularity: {
        type: Sequelize.INTEGER
      },
      preview_url: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      uri: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Tracks");
  }
};
