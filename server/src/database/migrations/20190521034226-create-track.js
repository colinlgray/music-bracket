"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Tracks", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false
      },
      duration: {
        type: Sequelize.INTEGER
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
      disc_number: {
        type: Sequelize.INTEGER
      },
      duration_ms: {
        type: Sequelize.INTEGER
      },
      is_local: {
        type: Sequelize.STRING
      },
      is_playable: {
        type: Sequelize.BOOLEAN
      },
      name: {
        type: Sequelize.STRING
      },
      track_number: {
        type: Sequelize.INTEGER
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
