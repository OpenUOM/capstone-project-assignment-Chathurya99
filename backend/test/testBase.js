const resetDatabase = (_db) => {
  return new Promise(async (resolve, reject) => {
    try {
      await _db.migrate.latest();
      await _db.seed.run();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  resetDatabase,
};
