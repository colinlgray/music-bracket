"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("AlbumImages", {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        ImageId: {
          type: Sequelize.UUID,
          primaryKey: true
        },
        AlbumId: {
          type: Sequelize.STRING,
          primaryKey: true
        }
      })
      .then(() => {
        return queryInterface.createTable("Images", {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            autoIncrement: false
          },
          url: {
            type: Sequelize.STRING
          },
          width: {
            type: Sequelize.INTEGER
          },
          height: {
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
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Images").then(() => {
      queryInterface.dropTable("AlbumImages");
    });
  }
};
