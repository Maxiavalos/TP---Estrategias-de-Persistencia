'use strict';
module.exports = (sequelize, DataTypes) => {
  const docente = sequelize.define("docente", {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    materia: DataTypes.INTEGER
  }, {});

  docente.associate = function(models) {
    docente.belongsTo(models.materia, {
      as: "Docente-Materia",
      foreignKey: "materia"
    });
  };

  return docente;
};
