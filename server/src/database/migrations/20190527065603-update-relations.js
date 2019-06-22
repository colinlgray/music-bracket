module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Competitors", "BracketId", {
      type: Sequelize.UUID,
      references: {
        model: "Brackets",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Competitors", "BracketId");
  }
};
