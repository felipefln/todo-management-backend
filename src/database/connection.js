const knex = require('knex')
const Configuration = require('../../knexfile')

const config = process.env.NODE_ENV === 'test' ? Configuration.test : Configuration.development;

const connection = knex(config)

module.exports = connection;