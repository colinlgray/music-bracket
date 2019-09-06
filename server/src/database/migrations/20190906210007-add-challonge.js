module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Brackets", "challongeUrl", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Brackets", "challongeUrl");
  }
};
