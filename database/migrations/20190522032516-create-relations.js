"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        "Tracks", // name of Target model
        "BracketId", // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: "Brackets", // name of Source model
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        }
      )
      .then(() => {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Tracks", // name of the Target model
      "BracketId" // key we want to remove
    );
  }
};
