"use strict";
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false
      },
      url: DataTypes.STRING,
      width: DataTypes.INTEGER,
      height: DataTypes.INTEGER
    },
    {
      name: {
        singular: "image",
        plural: "images"
      }
    }
  );
  Image.associate = function(models) {
    Image.belongsToMany(models.Album, { through: "AlbumImages" });
  };
  return Image;
};
