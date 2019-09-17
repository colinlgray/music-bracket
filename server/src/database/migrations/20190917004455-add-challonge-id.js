module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Brackets", "challongeId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Brackets", "challongeId");
  }
};
