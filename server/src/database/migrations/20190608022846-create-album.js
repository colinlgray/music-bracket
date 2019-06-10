"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("Albums", {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
          defaultValue: Sequelize.STRINGV4,
          allowNull: false,
          autoIncrement: false
        },
        album_type: {
          type: Sequelize.STRING
        },
        href: {
          type: Sequelize.STRING
        },
        name: {
          type: Sequelize.STRING
        },
        release_date: {
          type: Sequelize.STRING
        },
        release_date_precision: {
          type: Sequelize.STRING
        },
        total_tracks: {
          type: Sequelize.INTEGER
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
      })
      .then(() => {
        queryInterface.createTable("AlbumTracks", {
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          AlbumId: {
            type: Sequelize.STRING,
            primaryKey: true
          },
          TrackId: {
            type: Sequelize.STRING,
            primaryKey: true
          }
        });
      })
      .then(() => {
        queryInterface.createTable("AlbumArtists", {
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          AlbumId: {
            type: Sequelize.STRING,
            primaryKey: true
          },
          ArtistId: {
            type: Sequelize.STRING,
            primaryKey: true
          }
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface
      .dropTable("Albums")
      .then(() => {
        queryInterface.dropTable("AlbumTracks");
      })
      .then(() => {
        queryInterface.dropTable("AlbumArtists");
      });
  }
};
