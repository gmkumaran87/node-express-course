const express = require("express");

const router = express.Router();

const {
    getPeople,
    createPerson,
    updatePerson,
    deletePerson,
} = require("../controllers/peopleController");

router
    .route("/")
    .get(getPeople)
    .post(createPerson)
    .put(updatePerson)
    .delete(deletePerson);
/*
// GET Request
router.get("/", getPeople);
// POST Request
router.post("/", createPerson);

//PUT Request handler
router.put("/:changeId", updatePerson);

// DELTE request handled
router.delete("/:changeId", deletePerson);*/

module.exports = router;