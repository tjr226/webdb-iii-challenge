const express = require('express');
const router = express.Router();
const cohortDB = require('../data/cohortsModel');

// working, tested
router.post('/', async (req, res) => {
    const name = req.body;
    try {
        console.log("in try");
        console.log("name is,", name);
        console.log(name)
        const newCohort = await cohortDB.add(name);
        console.log("newCohort is", newCohort)
        res.status(201).json(newCohort);
    } catch (error) {
        res.status(500).json({ error: "The cohort could not be created." });
    }
});

// working, tested
router.get('/', async (req, res) => {
    // console.log("get cohorts running");
    try {
        const cohorts = await cohortDB.find();
        res.status(200).json(cohorts);
    } catch (error) {
        res.status(500).json({ error: "Could not retrieve cohorts." })
    }
});

// working, tested
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const cohort = await cohortDB.findById(id);
        res.status(200).json(cohort);
    } catch (error) {
        res.status(500).json({ error: "Could not retrieve cohort." })
    }
});

// working, tested
router.get('/:id/students', async (req, res) => {
    const id = req.params.id;
    try {
        const cohort = await cohortDB.findStudentsByCohort(id);
        res.status(200).json(cohort);
    } catch (error) {
        res.status(500).json({ error: "Could not retrive the students." });
    }
});

// working, tested
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const name = req.body;
    try {
        const confirmation = await cohortDB.update(id, name);
        res.status(200).json(confirmation);
    } catch (error) {
        res.status(500).json({ error: "The cohort could not be updated." });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const confirmation = await cohortDB.remove(id);
        res.status(200).json(confirmation);
    } catch (error) {
        res.status(500).json({ error: "The cohort could not be deleted." });
    }
});


module.exports = router;