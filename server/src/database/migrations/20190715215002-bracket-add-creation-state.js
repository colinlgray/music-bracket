module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Brackets", "creationState", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Brackets", "creationState");
  }
};
