'use strict';
module.exports = (sequelize, DataTypes) => {
  const estudiante = sequelize.define('estudiante', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    dni: DataTypes.INTEGER,
    id_carrera: DataTypes.INTEGER
  }, {});

  estudiante.associate = function(models) {
    // Asociación a carreras (pertenece a:)
    estudiante.belongsTo(models.carrera, {
      as: 'Estudiante-Carrera',
      foreignKey: 'id_carrera'
    });
  };

  return estudiante;
};
