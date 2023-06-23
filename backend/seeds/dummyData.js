exports.seed = function(knex) {
  return knex('dummyData').del()
    .then(function () {
      return knex('dummyData').insert([
        { id: 1, dummyDataOne: 'DummyData', dummyDataOne: 'DummyData'},
        { id: 2, dummyDataOne: 'DummyData', dummyDataOne: 'DummyData'},
        { id: 3, dummyDataOne: 'DummyData', dummyDataOne: 'DummyData'},
        { id: 4, dummyDataOne: 'DummyData', dummyDataOne: 'DummyData'},
        { id: 5, dummyDataOne: 'DummyData', dummyDataOne: 'DummyData'},
        { id: 6, dummyDataOne: 'DummyData', dummyDataOne: 'DummyData'},
      ]);
    });
};