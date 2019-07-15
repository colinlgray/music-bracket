module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Brackets", "isStarted", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Brackets", "isStarted");
  }
};
