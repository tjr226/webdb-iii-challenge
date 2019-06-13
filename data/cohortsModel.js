const db = require('./dbConfig');

module.exports = {
    find,
    findById,
    findStudentsByCohort,
    add,
    remove,
    update
};

function find() {
    return db('cohorts');
}

function findById(id) {
    return db('cohorts')
        .where({ id })
        .first();
}

function findStudentsByCohort(id) {
    return db('students')
        .where({ cohort_id: id })
}

async function add(cohort) {
    console.log(cohort);
    const [id] = await db('cohorts').insert(cohort);
    return findById(id);
}

// async function execute () {
//     const newThing = await findById({ id: 2 });
//     console.log("execute test", newThing)
// }

function remove(id) {
    return db('cohorts')
        .where({ id })
        .del();
}

function update(id, changes) {
    return db('cohorts')
        .where({ id })
        .update(changes, '*')
}

// execute();