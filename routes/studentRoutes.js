const express = require('express');
const router = express.Router();
const studentDB = require('../data/studentsModel');
const cohortDB = require('../data/cohortsModel');

// working tested
router.post('/', validateCohortId, async (req, res) => {
    const { name, cohort_id } = req.body;
    try {
        const newStudent = await studentDB.add({
            name: name,
            cohort_id: cohort_id
        })
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ error: "The student could not be created." })
    }
});

// working tested
router.get('/', async (req, res) => {
    try {
        const students = await studentDB.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: "Could not retrieve students." });
    }
});

// working tested
// API returned object matches readme
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const student = await studentDB.findById(id);
        const cohort = await cohortDB.findById(student.cohort_id);
       
        const studentToReturn = {
            id: student.id,
            name: student.name,
            cohort: cohort.name
        }
        res.status(200).json(studentToReturn);
    } catch (error) {
        res.status(500).json({ error: "The student could not be retrieved." });
    }
})

// working tested
router.put('/:id', validateCohortId, async (req, res) => {
    const id = req.params.id;
    const { name, cohort_id } = req.body;
    try {
        const confirmation = await studentDB.update(id, { name: name, cohort_id: cohort_id });
        res.status(200).json(confirmation);
    } catch (error) {
        res.status(500).json({ error: "The student could not be updated." });
    }
});

// working tested
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const confirmation = await studentDB.remove(id);
        res.status(200).json(confirmation);
    } catch (error) {
        res.status(500).json({ error: "The student could not be deleted." });
    }
});


// middleware

// working tested
async function validateCohortId(req, res, next) {
    const { name, cohort_id } = req.body
    cohort = await cohortDB.findById(cohort_id)
    if (!cohort) {
        return res.status(400).json({ message: "Invalid cohort." });
    }
    next();
}


module.exports = router;