'use strict';
module.exports = (sequelize, DataTypes) => {
  const docente = sequelize.define("docente", {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    id_materia: DataTypes.INTEGER
  }, {});

  docente.associate = function(models) {
    // Asociación a materias (pertenece a:)
    docente.belongsTo(models.materia, {
      as: "Docente-Materia",
      foreignKey: "id_materia"
    });
  };

  return docente;
};
