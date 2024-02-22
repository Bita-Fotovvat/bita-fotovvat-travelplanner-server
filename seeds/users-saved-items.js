
const usersData = require('../seed-data/users');
const savedItemsData = require('../seed-data/saved-items');

exports.seed = async function(knex) {

  await knex('saved_items').del();
  await knex('users').del();


  await knex('users').insert(usersData);
  await knex('saved_items').insert(savedItemsData);
};
