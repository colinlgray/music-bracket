"use strict";
const artistProps = {
  href: "https://api.spotify.com/v1/artists/7jVv8c5Fj3E9VhNjxT4snq",
  id: "7jVv8c5Fj3E9VhNjxT4snq",
  name: "Lil Nas X",
  type: "artist",
  uri: "spotify:artist:7jVv8c5Fj3E9VhNjxT4snq",
  createdAt: new Date(),
  updatedAt: new Date()
};
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
    return queryInterface.bulkInsert("artists", [artistProps], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.bulkDelete("artists", artistProps, {});
  }
};
