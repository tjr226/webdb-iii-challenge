const db = require('./dbConfig');

module.exports = {
    find,
    findById,
    add,
    remove,
    update
};

function find() {
    return db('students');
}

function findById(id) {
    return db('students')
        .where({ id })
        .first();
}

async function add(student) {
    const [id] = await db('students').insert(student);
    return findById(id);
}

function remove(id) {
    return db('students')
        .where({ id })
        .del();
}

function update(id, changes) {
    return db('students')
        .where({ id })
        .update(changes, '*')
}