module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("ArtistTracks", {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        ArtistId: {
          type: Sequelize.UUID,
          primaryKey: true
        },
        TrackId: {
          type: Sequelize.UUID,
          primaryKey: true
        }
      })
      .then(() => {
        queryInterface.addColumn("Competitors", "BracketId", {
          type: Sequelize.UUID,
          references: {
            model: "Brackets",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        });
      })
      .then(() => {
        queryInterface.addColumn("Competitors", "TrackId", {
          type: Sequelize.UUID,
          references: {
            model: "Tracks",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .dropTable("ArtistTracks")
      .then(() => {
        return queryInterface.removeColumn("Competitors", "TrackId");
      })
      .then(() => {
        return queryInterface.removeColumn("Competitors", "BracketId");
      });
  }
};
