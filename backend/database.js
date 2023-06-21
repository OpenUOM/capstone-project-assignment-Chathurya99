const dbConnection = require("./sqlite");

dbConnection
  .getDbConnection()
  .then((db) => {
    init(db);
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

let _db;

function init(db) {
  _db = db;
}

const knex_db = require("./db-config");
const testBase = require("./testBase");

const resetDatabase = async () => {
  await testBase.resetDatabase(knex_db);
};

const readTeachers = async () => {
  return _db.select().from("teacher");
};

const readTeacherInfo = async (id) => {
  return _db.select().from("teacher").where({ id }).first();
};

const addTeacher = async (id, name, age) => {
  return _db("teacher").insert({ id, name, age });
};

const updateTeacher = async (name, age, id) => {
  return _db("teacher").where({ id }).update({ name, age });
};

const deleteTeacher = async (id) => {
  return _db("teacher").where({ id }).del();
};

const readStudents = async () => {
  return _db.select().from("student");
};

const readStudentInfo = async (id) => {
  return _db.select().from("student").where({ id }).first();
};

const addStudent = async (id, name, age, religion) => {
  return _db("student").insert({ id, name, age, religion });
};

const updateStudent = async (name, age, religion, id) => {
  return _db("student").where({ id }).update({ name, age, religion });
};

const deleteStudent = async (id) => {
  return _db("student").where({ id }).del();
};

module.exports = {
  resetDatabase,
  readTeachers,
  readStudents,
  addStudent,
  addTeacher,
  deleteTeacher,
  deleteStudent,
  readStudentInfo,
  readTeacherInfo,
  updateStudent,
  updateTeacher,
};
