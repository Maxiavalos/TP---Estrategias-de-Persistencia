var express = require("express");
var router = express.Router();
var models = require("../models/profesor");

// Función para encontrar un profesor por ID
const findProfesor = (id, { onSuccess, onNotFound, onError }) => {
  models.profesor
    .findOne({
      attributes: ["id", "nombre", "telefono", "dni", "especialidad"],
      where: { id }
    })
    .then(profesor => (profesor ? onSuccess(profesor) : onNotFound()))
    .catch(() => onError());
};

// GET - Obtener todos los profesores
router.get("/", (req, res) => {
  models.profesor
    .findAll({
      attributes: ["id", "nombre", "telefono", "dni", "especialidad"]
    })
    .then(profesores => res.send(profesores))
    .catch(() => res.sendStatus(500));
});

// POST - Crear un nuevo profesor
router.post("/", (req, res) => {
  models.profesor
    .create({
      nombre: req.body.nombre,
      telefono: req.body.telefono,
      dni: req.body.dni,
      especialidad: req.body.especialidad
    })
    .then(profesor => res.status(201).send({ id: profesor.id }))
    .catch(error => {
      console.log(`Error al intentar insertar en la base de datos: ${error}`);
      res.sendStatus(500);
    });
});

// GET - Obtener un profesor por ID
router.get("/:id", (req, res) => {
  findProfesor(req.params.id, {
    onSuccess: profesor => res.send(profesor),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

// PUT - Actualizar un profesor por ID
router.put("/:id", (req, res) => {
  const onSuccess = profesor =>
    profesor
      .update(
        {
          nombre: req.body.nombre,
          telefono: req.body.telefono,
          dni: req.body.dni,
          especialidad: req.body.especialidad
        },
        { fields: ["nombre", "telefono", "dni", "especialidad"] }
      )
      .then(() => res.sendStatus(200))
      .catch(error => {
        console.log(`Error al intentar actualizar la base de datos: ${error}`);
        res.sendStatus(500);
      });
  findProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

// DELETE - Eliminar un profesor por ID
router.delete("/:id", (req, res) => {
  const onSuccess = profesor =>
    profesor
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
